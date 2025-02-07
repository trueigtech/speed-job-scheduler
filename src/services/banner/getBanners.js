import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { pageValidation } from '@src/utils/common'

export class GetBannersHandler extends BaseHandler {
  async run() {
    const { limit, pageNo, bannerType } = this.args


    const { page, size } = pageValidation(pageNo, limit)
    let query

    if (bannerType) query = { bannerType }

    const banners = await db.Banner.findAndCountAll({
      where: query || {},
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: size,
      offset: ((page - 1) * size),
      order: [['order', 'DESC'], ['createdAt', 'DESC']]
    })

    return { banners }

  }
}
