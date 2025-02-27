import db from '@src/db/models';
import { serverDayjs } from '@src/libs/dayjs';
import { BaseHandler } from '@src/libs/logicBase';
import { TransactionHandlerHandler } from "@src/services/wallet";
import { COINS, TRANSACTION_PURPOSE } from '@src/utils/constants/public.constants';

export class RackbackService extends BaseHandler {

  async run() {
    try {
      const calculateLastWeekDateRange = () => {

        const today = serverDayjs().startOf('day'); // This gives you the current date at 12 AM UTC
        // Calculate the day of the week (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)
        const dayOfWeek = today.day();
        // Calculate last Friday's date
        let lastFriday = today.subtract(dayOfWeek + 2, 'days'); // Subtract the number of days to get to Friday

        // Set the start date to the last Friday 12:00 AM UTC
        const startDate = lastFriday.startOf('day');
        // Set the end date to the following Thursday 11:59:59 PM UTC
        const endDate = lastFriday.add(6, 'days').endOf('day'); // Add 6 days to get to the following Thursday

        return { startDate, endDate };
      };

      // Example usage
      const { startDate, endDate } = calculateLastWeekDateRange();

      // big issue is that what if admin or smoeone stop cron because of some reason and then run same logic that time issue will get created
      // we can not count those data who are lost because of date filter


      const query = `

    WITH bet_and_win AS (
      SELECT
        u."user_id",
        SUM(CASE WHEN ct.action_type = 'casino_bet' AND tl.currency_code != 'GC' AND tl.transaction_type = 'casino' THEN tl.amount ELSE 0 END) AS total_bet_amount,
        SUM(CASE WHEN ct.action_type = 'casino_win' AND tl.currency_code != 'GC' AND tl.transaction_type = 'casino' THEN tl.amount ELSE 0 END) AS total_win_amount
      FROM "users" u
      LEFT JOIN "casino_transactions" ct ON ct."user_id" = u."user_id"
          AND ct.created_at >= '2024-01-24 00:00:00+00'
          AND ct.created_at < '2025-02-24 00:00:00+00'
          AND ct.action_type IN ('casino_bet', 'casino_win')
      LEFT JOIN "transaction_ledgers" tl ON tl."transaction_id" = ct."id"
          AND tl.transaction_type = 'casino'
      GROUP BY u."user_id"
    )
    
    SELECT
      u."user_id",
      ud."vip_tier_id",  -- Directly select the vip_tier_id without aggregation
      rt."rackback",  -- Directly select the rackback
      COALESCE(MAX(baw.total_bet_amount), 0) AS total_bet_amount,
      COALESCE(MAX(baw.total_win_amount), 0) AS total_win_amount,
      COALESCE(MAX(baw.total_bet_amount), 0) - COALESCE(MAX(baw.total_win_amount), 0) AS win_difference,
      CASE
        WHEN (COALESCE(MAX(baw.total_bet_amount), 0) - COALESCE(MAX(baw.total_win_amount), 0)) > 0 THEN
          (COALESCE(MAX(baw.total_bet_amount), 0) - COALESCE(MAX(baw.total_win_amount), 0)) * rt."rackback" / 100
        ELSE 0
      END AS rackback_amount
    FROM "users" u
    LEFT JOIN "user_details" ud ON ud."user_id" = u."user_id"
    LEFT JOIN bet_and_win baw ON baw."user_id" = u."user_id"
    LEFT JOIN "vip_tiers" vt ON vt."vip_tier_id" = ud."vip_tier_id"
    LEFT JOIN "rewards" rt ON rt."vip_tier_id" = vt."vip_tier_id"
        AND rt."is_active" = true
    GROUP BY u."user_id", ud."vip_tier_id", rt."rackback"  -- Group by user_id, vip_tier_id, and rackback to ensure uniqueness
    HAVING (COALESCE(MAX(baw.total_bet_amount), 0) - COALESCE(MAX(baw.total_win_amount), 0)) > 0
       AND (COALESCE(MAX(baw.total_bet_amount), 0) - COALESCE(MAX(baw.total_win_amount), 0)) * rt."rackback" / 100 > 0;
    
    `


      const result = await db.sequelize.query(query, {
        replacements: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        type: db.sequelize.QueryTypes.SELECT
      });

      await Promise.all(
        result.map(async (entry) => {
          if (entry.rackback_amount !== null) {
            const roundedAmount = parseFloat((Number(entry.rackback_amount)).toFixed(2));

            // Call the function with the necessary parameters
            await TransactionHandlerHandler.execute({
              userId: entry.user_id,
              amount: roundedAmount,
              currencyCode: COINS.SWEEP_COIN.BONUS_SWEEP_COIN,
              purpose: TRANSACTION_PURPOSE.BONUS_RACKBACK
            }, this.context);
          }
        })
      );

      return result;
    } catch (error) {
      console.log(error)
    }
  }
}
