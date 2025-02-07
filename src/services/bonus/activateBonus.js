import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from "@src/errors/app.error"
import { Errors } from "@src/errors/errorCodes"
import { BaseHandler } from '@src/libs/logicBase'
import { calculateHash } from '@src/utils/common'
import { BONUS_TYPE, PROVIDERS_CHECK, USER_BONUS_STATUS_VALUES } from '@src/utils/constants/bonus.constants'
import { SUCCESS_MSG } from '@src/utils/success'
import axios from 'axios'
import { Op } from 'sequelize'

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    userBonusId: { type: ['number', 'string'] },
    user: { type: 'object' }
  },
  required: ['id', 'userBonusId', 'user']
}



export class ActivateBonusHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  static async run() {
    const { id, userBonusId, user } = this.args
    const transaction = this.context.sequelizeTransaction


    const activeBonus = await db.UserBonus.findOne({
      where: { userId: id, status: { [Op.in]: [USER_BONUS_STATUS_VALUES.IN_PROCESS] } },
      attributes: ['id', 'status']
    })
    if (activeBonus) throw new AppError(Errors.ACTIVE_BONUS)

    const userBonusExists = await db.UserBonus.findOne({
      where: { userId: id, id: userBonusId },
      include: {
        model: db.Bonus,
        where: { bonusType: BONUS_TYPE.FREESPINS },
        attributes: ['id', 'claimedCount', 'promotionTitle', 'daysToClear']
      },
    })
    if (!userBonusExists) throw new AppError(Errors.BONUS_NOT_FOUND)
    if (userBonusExists.bonusType === BONUS_TYPE.FREESPINS) {
      const freeSpinBonus = await db.FreespinBonus.findOne({
        where: { bonusId: userBonusExists.bonus.id },
        include: { model: db.CasinoProvider }
      })

      let response
      if (freeSpinBonus.CasinoProvider.name === PROVIDERS_CHECK.PRAGMATIC) {
        const requestData = {
          secureLogin: config.get('pragmaticPlay.secureLogin'),
          bonusCode: freeSpinBonus.bonusCode
        }
        const hash = calculateHash(requestData, config.get('pragmaticPlay.secretKey'))
        requestData.hash = hash
        response = await axios({
          url: `${config.get('pragmaticPlay.baseUrl')}/FreeRoundsBonusAPI/v2/players/add?secureLogin=${config.get('pragmaticPlay.secureLogin')}&bonusCode=${freeSpinBonus.bonusCode}&hash=${hash}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            playerList: [`${id}PPUSD`]
          }
        })
      }

      await freeSpinBonus.set({ response: response.data }).save({ transaction })
      await userBonusExists.bonus.set({ claimedCount: +userBonusExists.bonus.claimedCount + 1 }).save({ transaction })
      await userBonusExists.set({ status: USER_BONUS_STATUS_VALUES.IN_PROCESS, claimedAt: new Date() }).save({ transaction })
      return { success: true, message: SUCCESS_MSG.AVAIL_BONUS }
    }

  }
}
