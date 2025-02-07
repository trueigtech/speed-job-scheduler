import db from '@src/db/models';
import ajv from '@src/libs/ajv';
import { BaseHandler } from '@src/libs/logicBase';
import { TRANSACTION_PURPOSE } from '@src/utils/constants/public.constants';
import { Op } from 'sequelize';
import { TransactionHandlerHandler } from '../wallet';

const constraints = ajv.compile({
  type: 'object',
  properties: {
    transaction: { type: 'object' }
  },
  required: ['transaction'],
  additionalProperties: true,
});

export class EarnedCommissionService extends BaseHandler {
  get constraints() {
    return constraints;
  }
  
  async run() {    
    const { sequelize } = this.args;
    
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
          on: {
            transactionId: sequelize.where(
              sequelize.cast(sequelize.col('casinoLedger.transaction_id'), 'TEXT'),
              '=',
              sequelize.col('CasinoTransaction.transaction_id')
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
          [Op.gte]: startDate
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

      const transaction = await sequelize.transaction();

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
          console.log('Referrer user not found');
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
          }, 
          { 
            sequelizeTransaction: transaction 
          }
        );
        
        let affiliateRelation = await db.UserAffiliations.findOne(
          { 
            where: { affiliateUserId: refParentId, referredUserId: userId },
            transaction
          }
        );
    
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
  }
}
