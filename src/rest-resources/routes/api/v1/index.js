import express from 'express'

import { siteRouter } from './site.router'

import responseValidationMiddleware from '@src/rest-resources/middlewares/responseValidation.middleware'


const v1router = express.Router()
v1router.use('/', siteRouter, responseValidationMiddleware({}))

export default v1router
