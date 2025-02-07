import ajv from '@src/libs/ajv'
import { uploadHuaweiImage, deleteImage } from '@src/utils/common' // deleteImage
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

const schema = {
  type: 'object',
  properties: {
    user: { type: 'object' },
    profileImage: { type: 'object' }
  },
  required: ['user', 'profileImage']
}



export class UploadProfileImageHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

   async run () {
    const { user, profileImage } = this.args
    let key

  
      if (user.profileImage) {
        await deleteImage(user.profileImage)
      }
      if (profileImage && typeof (profileImage) === 'object') {
        key = await uploadHuaweiImage(profileImage)
      }
      const data = { profileImage: key.fileName }
      await user.set(data).save()
      return { success: true, key: key.fileName, message: SUCCESS_MSG.UPLOAD_SUCCESS }
   
  }
}
