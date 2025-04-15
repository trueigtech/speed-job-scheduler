import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { Op, fn, col } from 'sequelize'
import { Logger } from '@src/libs/logger'

export class AffiliateCommissionService extends BaseHandler {
  async run () {
    const t = await db.sequelize.transaction()

    try {
      //  Get last 7 days
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 7)

      const affiliates = await db.UserAffiliations.findAll({
        where: {
          isActive: true,
          created_at: {
            [Op.gte]: startDate
          }
        },
        attributes: [
          'affiliateUserId',
          [fn('SUM', col('earnedCommission')), 'totalCommission']
        ],
        group: ['affiliateUserId'],
        raw: true,
        transaction: t
      })

      for (const affiliate of affiliates) {
        const { affiliateUserId, totalCommission } = affiliate

        if (parseFloat(totalCommission) > 0) {
          const wallet = await db.Wallet.findOne({
            where: { userId: affiliateUserId },
            transaction: t
          })

          if (wallet) {
            wallet.balance += parseFloat(totalCommission)
            await wallet.save({ transaction: t })
          }
        }
      }

      await t.commit()
      Logger.info('Weekly affiliate payments settled successfully.')
    } catch (err) {
      await t.rollback()
      Logger.error(' Error settling weekly affiliate payments:', err)
    }
  }
}
