import { Errors } from "@src/errors/errorCodes"
import { AppError } from "@src/errors/app.error"
import { Op, Sequelize } from 'sequelize'

import db from '@src/db/models'
import ajv from '@src/libs/ajv'
import { getOne } from '../helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { getLocation } from '@src/utils/common'
import { BONUS_TYPE, TIME_PERIOD } from '@src/utils/constant'

const schema = {
  type: 'object',
  required: ['tenantId']
}


export class GetCashbackBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

   async run () {
    const { userId, tenantId, ipAddress } = this.args
    let cashbackDetails, country, query

  
      query = {
        bonusType: BONUS_TYPE.DEPOSIT,
        isActive: true,
        tenantId,
        [Op.or]: [
          { other: { [Op.contains]: Sequelize.literal(`'{ "timePeriod" : "${TIME_PERIOD.DAILY}" }'::jsonb`) } },
          { other: { [Op.contains]: Sequelize.literal(`'{ "timePeriod" : ${TIME_PERIOD.DAILY} }'::jsonb`) } }
        ]
      }

      if (userId) {
        const userDetails = await getOne({ model: db.User, data: { userId }, attributes: ['countryCode'] })
        if (userDetails) country = userDetails.countryCode
      } else {
        const restricted = await getLocation(ipAddress)
        if (!restricted) throw new AppError(Errors.COUNTRY_NOT_FOUND)

        country = restricted?.code
      }

      if (country) {
        query = {
          ...query,
          [Op.not]: {
            other: {
              [Op.contains]: Sequelize.literal(`'{ "countries" : ["${country}"] }'::jsonb`)
            }
          }
        }
      }

      const bonusDetail = await getOne({
        model: db.Bonus,
        data: query,
        attributes: ['bonusId', 'other'],
        order: [['bonusId', 'desc']]
      })

      if (bonusDetail) cashbackDetails = bonusDetail?.other?.loyaltyLevel

      return { cashbackDetails, message: SUCCESS_MSG.GET_SUCCESS }
   
  }
}
