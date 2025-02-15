import db from '@src/db/models';
import { serverDayjs } from '@src/libs/dayjs';
import { BaseHandler } from '@src/libs/logicBase';
import { TransactionHandlerHandler } from "@src/services/wallet";
import { COINS, TRANSACTION_PURPOSE } from '@src/utils/constants/public.constants';

export class RakebackService extends BaseHandler {

  async run() {

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
            SELECT
              u."user_id",
              ud."vip_tier_id",
              rt."rackback",
              COALESCE(SUM(w."amount"), 0) AS total_withdraw,
              COALESCE(SUM(tl."amount"), 0) AS total_deposit,
              COALESCE(SUM(tl."amount"), 0) - COALESCE(SUM(w."amount"), 0) AS difference,
              CASE
                WHEN (COALESCE(SUM(tl."amount"), 0) - COALESCE(SUM(w."amount"), 0)) > 0
                THEN (COALESCE(SUM(tl."amount"), 0) - COALESCE(SUM(w."amount"), 0)) * rt."rackback" / 100
                ELSE 0
              END AS rackback_amount
            FROM "users" u
            LEFT JOIN "user_details" ud ON ud."user_id" = u."user_id"
            LEFT JOIN "withdrawals" w ON w."user_id" = u."user_id" AND w."status" = 'Success'
                AND w."created_at" >= :startDate AND w."created_at" < :endDate
            LEFT JOIN "transactions" t ON t."user_id" = u."user_id" AND t."purpose" = 'purchase'
                AND t."created_at" >= :startDate AND t."created_at" < :endDate
            LEFT JOIN "transaction_ledgers" tl ON tl."transaction_id" = t."transaction_id"
                AND tl."transaction_type" = 'banking'
            LEFT JOIN "vip_tiers" vt ON vt."vip_tier_id" = ud."vip_tier_id"
            LEFT JOIN "rewards" rt ON rt."vip_tier_id" = vt."vip_tier_id"
                AND rt."is_active" = true
            GROUP BY u."user_id", ud."vip_tier_id", rt."rackback"
            HAVING (COALESCE(SUM(tl."amount"), 0) - COALESCE(SUM(w."amount"), 0)) > 0;
            `

    const result = await db.sequelize.query(query, {
      replacements: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      type: db.sequelize.QueryTypes.SELECT
    });


    await Promise.all(
      result.map(async (entry) => {
        if (entry.rackback_amount !== null) {
          const roundedAmount = parseFloat(entry.rackback_amount.toFixed(2));

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
  }
}
