import { Errors } from '@src/errors/errorCodes'
import { AppError } from '@src/errors/app.error'
import db from '@src/db/models'
import { getOne } from '../helper/crud'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'
import { DEFAULT_LANGUAGE } from '@src/utils/constant'
// import { getDynamicDataValue, insertDynamicDataInCmsTemplate } from '../helper/email'

export class GetCmsPageHandler extends BaseHandler {
   async run () {
    let { cmsPageId, cmsSlug, language } = this.args

  
      let query
      if (cmsPageId) query = { cmsPageId }
      if (cmsSlug) query = { slug: cmsSlug }
      if (!language) language = DEFAULT_LANGUAGE

      const cmsDetails = await getOne({ model: db.CmsPage, data: query })

      if (!cmsDetails) throw new AppError(Errors.CMS_NOT_FOUND)
      if (!cmsDetails.content[language]) language = DEFAULT_LANGUAGE
      // cmsDetails.content = insertDynamicDataInCmsTemplate({ template: cmsDetails.content[language], dynamicData: await getDynamicDataValue() })

      return { cmsDetails, message: SUCCESS_MSG.GET_SUCCESS }
   
  }
}
