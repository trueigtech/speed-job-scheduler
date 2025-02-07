import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'

import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
// import { SUCCESS_MSG } from '@src/utils/success'

export class GetBonusDetailHandler extends BaseHandler {
  async run () {
    const { bonusId, userId } = this.args
    const include = []
  
      if (userId) {
        include.push({
          model: db.UserBonus,
          where: { userId, bonusId },
          required: false
        })
      }
      const bonusDetails = await db.Bonus.findOne({
        where: { id: bonusId },
        include: include
      })
      if (!bonusDetails) throw new AppError(Errors.BONUS_NOT_FOUND)

      return { bonusDetails }
   
  }
}
