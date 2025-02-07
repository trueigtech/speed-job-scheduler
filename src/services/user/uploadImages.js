import ajv from '@src/libs/ajv'
import { SUCCESS_MSG } from '@src/utils/success'
import { BaseHandler } from '@src/libs/logicBase'
import { uploadHuaweiImage } from '@src/utils/common'
import { createNewEntity } from '../helper/crud'
import db from '@src/db/models'

const schema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    file: { type: 'object' }
  },
  required: []
}



export class UploadImagesHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

   async run () {
    const { id, file } = this.args

  
      const document = await uploadHuaweiImage(file)
      const savedFile = await createNewEntity({
        model: db.UserDocument,
        data: {
          userId: id,
          documentUrl: document.documentUrl,
          documentName: document.fileName,
          status: document.status,
          actionee: id,
          actionPerformedAt: new Date().getTime()
        }
      })

      return { imageSignature: savedFile, message: SUCCESS_MSG.GET_SUCCESS }
   
  }
}
