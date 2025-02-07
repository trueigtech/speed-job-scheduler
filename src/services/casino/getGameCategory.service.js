import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetGameCategoryHandler extends BaseHandler {
  async run() {
  

      const casinoCategories = await db.CasinoCategory.findAndCountAll({
        where:  { isActive: true },
        order: [['id']],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return { casinoCategories }
   
  }
}
