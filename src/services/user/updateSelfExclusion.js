import db from '@src/db/models'
import { SUCCESS_MSG } from '@src/utils/success'
import { BaseHandler } from '@src/libs/logicBase'
import { dayjs } from '@src/libs/dayjs'

export class UpdateSelfExclusionHandler extends BaseHandler {
  async run () {
    const {
      userId,
      selfExclusion,
      isSelfExclusionPermanent,
      selfExclusionType
    } = this.args
    const transaction = this.context.sequelizeTransaction
    const selfExclusionUpdatedAt = dayjs()
    const formattedSelfExclusion = dayjs().format(selfExclusion)

    const [userLimits] = await db.Limit.upsert(
      {
        userId,
        selfExclusion: formattedSelfExclusion,
        isSelfExclusionPermanent,
        selfExclusionType,
        selfExclusionUpdatedAt
      },
      {
        transaction
      }
    )
    return { userLimits, message: SUCCESS_MSG.UPDATE_SUCCESS }
  }
}
