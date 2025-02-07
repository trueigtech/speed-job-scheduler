import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { client } from '@src/libs/redis'
import { JWT_TOKEN_TYPES } from '@src/utils/constant'
import Jwt from 'jsonwebtoken'

export async function isUserAuthenticated(req, res, next) {
  try {
    const accessToken = req.headers.authorization?.split('Bearer ')[1]
    if (!accessToken) return next(new AppError(Errors.INVALID_TOKEN))

    const decodedToken = Jwt.verify(accessToken, config.get('jwt.tokenSecret'))
    if (decodedToken.type !== JWT_TOKEN_TYPES.LOGIN) return next(new AppError(Errors.INVALID_TOKEN))
    const token = await client.get(`${decodedToken.userId}:ACCESS_TOKEN`)
    console.log(token, "++++token")
    console.log(accessToken, "++++accessToken")
    // if (token !== accessToken) return next(new AppError(Errors.INVALID_TOKEN))
    const user = await db.User.findOne({
      where: { userId: decodedToken.userId },
      transaction: req.context?.sequelizeTransaction
    })
    if (!user) next(new AppError(Errors.INVALID_TOKEN))
    req.body.userId = decodedToken.userId
    req.query.userId = decodedToken.userId
    console.log("  decodedToken.userId ", decodedToken.userId)
    console.log("  req.query.userId ", req.query.userId)
    console.log("  req.body.userId ", req.body.userId)
    req.body.username = decodedToken?.username

    next()
  } catch (error) {
    console.log(error)
    next(new AppError(Errors.INVALID_TOKEN))
  }
}


export async function semiAuth(req, res, next) {
  try {
    const accessToken = req.headers.authorization?.split('Bearer ')[1]
    if (accessToken) {
      // Attempt to authenticate the user
      await isUserAuthenticated(req, res, (err) => {
        if (err) {
          throw err
        }
        // Proceed regardless of error
        next();
      });
    } else {
      // No token provided, proceed without user data
      next();
    }
  } catch (error) {
    next(new AppError(Errors.INVALID_TOKEN))
  }
}
