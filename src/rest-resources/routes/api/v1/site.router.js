import SiteController from '@src/rest-resources/controllers/site.controller'
import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
import express from 'express'

const args = { mergeParams: true }
const siteRouter = express.Router(args)

siteRouter.route('/banners').get(requestValidationMiddleware({}), SiteController.getBanners)

export { siteRouter }
