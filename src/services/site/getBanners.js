import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'

export class GetBannersHandler extends BaseHandler {
   async run () {
    const { key } = this.args
  
      let query
      if (key) query = { bannerType: key }
      const banners = await db.Banner.findAndCountAll({
        where: query
      })

      return { banners }
   
  }
}
