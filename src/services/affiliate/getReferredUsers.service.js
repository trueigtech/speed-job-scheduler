import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@src/utils/constants/constants'

export class GetReferredUsersHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const { userId, limit = DEFAULT_LIMIT, pageNo = DEFAULT_PAGE } = this.args
    const { page, size } = pageValidation(pageNo, limit)

    const referredUsers = await db.UserAffiliations.findAndCountAll({
      where: { affiliateUserId: userId },
      include: [
        {
          model: db.User,
          as: 'referredUser',
          attributes: ['userId', 'username'],
        },
      ],
      attributes: ['earnedCommission', 'wageredAmount', 'createdAt'],
      limit: size,
      offset: (page - 1) * size,
      order: [['createdAt', 'DESC']],
    });

    return { referredUsers }
  }
}
