import { Op, Sequelize } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '../helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getPrimaryCurrencyAmount } from '@src/utils/common'
import { BONUS_TYPE, TIME_PERIOD } from '@src/utils/constant'
import { getCashbackParameters, totalBets, totalDeposit, totalWins } from '../helper/bonus'

const schema = {
  type: 'object',
  properties: {
    user: { type: 'object' }
  },
  required: ['user']
}


export class GetCashbackBalanceHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

   async run () {
    const { user } = this.args
    let cashback = 0

  
      const bonusDetail = await getOne({
        model: db.Bonus,
        data: {
          bonusType: BONUS_TYPE.DEPOSIT,
          isActive: true,
          tenantId: user.tenantId,
          [Op.or]: [
            { other: { [Op.contains]: Sequelize.literal(`'{ "timePeriod" : "${TIME_PERIOD.DAILY}" }'::jsonb`) } },
            { other: { [Op.contains]: Sequelize.literal(`'{ "timePeriod" : ${TIME_PERIOD.DAILY} }'::jsonb`) } }
          ],
          [Op.not]: {
            other: {
              [Op.contains]: Sequelize.literal(`'{ "countries" : ["${user.countryCode}"] }'::jsonb`)
            }
          }
        },
        attributes: ['bonusId', 'other', 'currency'],
        order: [['bonusId', 'desc']]
      })

      if (bonusDetail) {
        const cashbackParams = await getCashbackParameters(user.level, bonusDetail)
        const date = new Date(Date.now())

        const totalAmount = await totalDeposit(date, date, user.userId, user.tenantId)
        const bets = await totalBets(date, date, user.userId, user.tenantId)
        const wins = await totalWins(date, date, user.userId, user.tenantId)

        const difference = bets - wins

        if (totalAmount && (difference >= totalAmount)) {
          cashback = Math.round((totalAmount * cashbackParams.bonusPercentage) * 100) / 100
          const userAmount = (await getPrimaryCurrencyAmount({ currencyCode: user.currencyCode, amount: cashbackParams.maximumBonus })).amount
          if (cashback > parseFloat(userAmount)) cashback = parseFloat(userAmount)
        }
      }

      return { cashback, message: SUCCESS_MSG.GET_SUCCESS }
   
  }
}
