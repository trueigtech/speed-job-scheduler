import db from '@src/db/models';
import { BaseHandler } from '@src/libs/logicBase';
import { TRANSACTION_PURPOSE } from '@src/utils/constants/public.constants';
import sequelize, { Op } from 'sequelize';
import { TransactionHandlerHandler } from "@src/services/wallet";
import { Logger } from '@src/libs/logger';


export class AffiliateCommissionService extends BaseHandler {

    async run() {
        try {

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            const betAmounts = await db.CasinoTransaction.findAll({
                attributes: [
                    'userId',
                    [sequelize.fn('SUM', sequelize.col('casinoLedger.amount')), 'totalBetAmount']
                ],
                include: [
                    {
                        model: db.TransactionLedger,
                        as: 'casinoLedger',
                        attributes: [],
                        required: true,
                        where: {
                            transaction_type: 'casino',
                            currency_code: { [Op.ne]: 'GC' } // sc amount check
                        },
                        on: {
                            transactionId: sequelize.where(
                                sequelize.col('casinoLedger.transaction_id'),
                                '=',
                                sequelize.col('CasinoTransaction.id')
                            )
                        }
                    },
                    {
                        model: db.User,
                        attributes: ['userId', 'refParentId'],
                        required: true,
                        where: {
                            refParentId: { [Op.ne]: null }
                        }
                    }
                ],
                where: {
                    created_at: {
                        [Op.gte]: '2024-02-24 00:00:00+00' // startDate
                    }
                },
                group: [
                    'CasinoTransaction.user_id',
                    'User.user_id',
                    'User.ref_parent_id'
                ],
                raw: true
            });

            for (const record of betAmounts) {
                const { userId, totalBetAmount, 'User.refParentId': refParentId } = record;
                const transaction = await db.sequelize.transaction();

                try {
                    const referrer = await db.User.findOne({
                        where: { userId: refParentId },
                        attributes: ['userId', 'username'],
                        include: [
                            {
                                model: db.UserDetails,
                                as: 'userDetails',
                                attributes: ['vipTierId'],
                            },
                        ],
                        transaction,
                    });

                    if (!referrer) {
                        await transaction.rollback();
                        continue;
                    }

                    const vipTierId = referrer.userDetails.vipTierId;

                    const reward = await db.Reward.findOne({
                        where: { vipTierId },
                        attributes: ['commissionRate'],
                        transaction,
                    });

                    if (!reward) {
                        console.log(`No reward entry found for VIP Tier ID: ${vipTierId}`);
                        await transaction.rollback();
                        continue;
                    }

                    const commissionRate = reward.commissionRate;

                    const commissionEarned = parseFloat(totalBetAmount * (commissionRate / 100)).toFixed(2);

                    await TransactionHandlerHandler.execute(
                        {
                            userId: refParentId,
                            currencyCode: 'BSC',
                            purpose: TRANSACTION_PURPOSE.RECEIVE_TIP,
                            amount: parseFloat(commissionEarned),
                        }, { sequelizeTransaction: transaction });

                    let affiliateRelation = await db.UserAffiliations.findOne(
                        { where: { affiliateUserId: refParentId, referredUserId: userId }, transaction });

                    if (affiliateRelation) {
                        affiliateRelation.earnedCommission += parseFloat(commissionEarned);
                        affiliateRelation.wageredAmount += parseFloat(totalBetAmount);
                        await affiliateRelation.save({ transaction });
                    }

                    await transaction.commit();
                } catch (error) {
                    console.error("Error processing commission:", error);
                    await transaction.rollback();
                }
            }

            return betAmounts;
        } catch (error) {
            Logger.error({ message: error })
        }
    }
}
