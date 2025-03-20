import db from "@src/db/models";
import { dayjs } from "@src/libs/dayjs";
import { BaseHandler } from "@src/libs/logicBase";
import { COINS, LEDGER_PURPOSE, WALLET_OWNER_TYPES } from "@src/utils/constants/public.constants";
import { Op } from "sequelize";
import { TransactionHandlerService } from "../wallet";

export class AgentCommissionHandler extends BaseHandler {
  async run() {

    try {
      // Define the date range (last Saturday to this Friday)
      const startDate = dayjs().day(-1).startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endDate = dayjs().day(5).endOf("day").format("YYYY-MM-DD HH:mm:ss");
      // const transaction = await db.sequelize.transaction()

      // Get all admins
      const admins = await db.AdminUser.findAll({
        where: {
          adminUserId: { [Op.not]: 1 } // Exclude adminUserId = 1
        },
        attributes: ["adminUserId", "path", "earningMultiplier"],
      });


      let adminProfits = [];

      for (const admin of admins) {
        const whereClauses = ["( u.path ILIKE CONCAT(:adminPath, '%') )"];
        const replacements = { adminPath: admin.path, startDate, endDate };

        whereClauses.push("l.created_at BETWEEN :startDate AND :endDate");
        const whereCondition = `WHERE ${whereClauses.join(" AND ")}`;

        // Query to calculate total wagered and total won
        const usersCasinoHistoryQuery = `
          SELECT
            SUM(CASE WHEN l.currency_code != 'GC' AND l.purpose = '${LEDGER_PURPOSE.CASINO_BET}' THEN l.amount ELSE 0 END) AS total_wagered,
            SUM(CASE WHEN l.currency_code != 'GC' AND l.purpose IN ('${LEDGER_PURPOSE.CASINO_WIN}', '${LEDGER_PURPOSE.CASINO_REFUND}') THEN l.amount ELSE 0 END) AS total_won
          FROM ledgers l
          JOIN wallets w ON l.from_wallet_id = w.id OR l.to_wallet_id = w.id
          JOIN users u ON w.owner_id = u.user_id AND w.owner_type = 'user'
          ${whereCondition};
        `;

        const earningReport = await db.sequelize.query(usersCasinoHistoryQuery, {
          type: db.Sequelize.QueryTypes.SELECT,
          replacements,
        });

        const totalWagered = earningReport?.[0]?.total_wagered || 0;
        const totalWin = earningReport?.[0]?.total_won || 0;
        const usersWagered = totalWagered * admin.earningMultiplier;
        const usersWon = totalWin * admin.earningMultiplier;
        const commissionIn = Math.max(usersWagered - usersWon, 0);
        const GGR = totalWagered - totalWin;

        // Calculate commission out
        const commissionOutQuery = `
        SELECT
          COALESCE(SUM(
            CASE 
              WHEN total_won >= total_wagered THEN 0 
              ELSE earning_multiplier * (total_wagered - total_won) 
            END
          ), 0) AS commission_out
        FROM (
          SELECT
            a.earning_multiplier,
            SUM(CASE WHEN l.currency_code != 'GC' AND l.purpose = '${LEDGER_PURPOSE.CASINO_BET}' THEN l.amount ELSE 0 END) AS total_wagered,
            SUM(CASE WHEN l.currency_code != 'GC' AND l.purpose IN ('${LEDGER_PURPOSE.CASINO_WIN}', '${LEDGER_PURPOSE.CASINO_REFUND}') THEN l.amount ELSE 0 END) AS total_won
          FROM admin_users a
          JOIN users u ON u.path LIKE CONCAT(a.path, '%')
          JOIN wallets w ON w.owner_id = u.user_id AND w.owner_type = 'user'
          JOIN ledgers l ON l.from_wallet_id = w.id OR l.to_wallet_id = w.id
        ${whereConditionForCommisionOut}
          GROUP BY a.earning_multiplier
        ) AS admin_earnings;
      `;

        const commissionOutResult = await db.sequelize.query(commissionOutQuery, {
          type: db.Sequelize.QueryTypes.SELECT,
          replacements: { adminUserId: admin.adminUserId, startDate, endDate },
        });

        const commissionOut = commissionOutResult?.[0]?.commission_out || 0;
        const finalProfit = commissionIn - commissionOut;

        // If the agent made a profit, transfer the earnings
        if (finalProfit > 0) {
          const roundedAmount = parseFloat((Number(finalProfit)).toFixed(2));

          await TransactionHandlerService.execute(
            {
              actioneeId: 1,
              actioneeType: WALLET_OWNER_TYPES.ADMIN,
              fromWalletOwnerId: 1,
              fromWalletOwnerType: WALLET_OWNER_TYPES.ADMIN,
              toWalletOwnerId: admin.adminUserId,
              toWalletOwnerType: WALLET_OWNER_TYPES.ADMIN,
              amount: roundedAmount,
              currencyCode: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
              purpose: LEDGER_PURPOSE.AGENT_COMMISSION,
            },
            this.context
          );
        }

        adminProfits.push({
          adminUserId: admin.adminUserId,
          totalWagered,
          totalWin,
          GGR,
          commissionIn,
          commissionOut,
          finalProfit,
        });
      }

      return adminProfits;

    }
    catch (error) {
      console.log('!!!!#####', error)
    }
  }
}
