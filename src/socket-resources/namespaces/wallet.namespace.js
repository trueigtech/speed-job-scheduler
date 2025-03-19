import { SOCKET_NAMESPACES, SOCKET_ROOMS } from '@src/libs/constants'
import db from '@src/db/models'
import jwt from 'jsonwebtoken'
import config from '@src/configs/app.config'
import Logger from '@src/libs/logger'
import { error } from 'winston'
/**
 *
 *
 * @export
 * @param {import('socket.io').Server} io
 */
export default function (io) {
  const namespace = io.of(SOCKET_NAMESPACES.WALLET)

  // namespace.use(authenticationSocketNamespaceMiddleWare)
  namespace.use(async (socket, next) => {
    try {
      const accessToken = socket.handshake.auth.accessToken || socket.handshake.headers.accesstoken
      if (!accessToken) {
        return next(new Error('TokenRequiredErrorType'))
      }
      const payLoad = await jwt.verify(accessToken, config.get('jwt.tokenSecret'))

      const findUser = await db.User.findOne({
        where: { userId: payLoad.userId }
      })
      if (!findUser) {
        return next(new Error('UserNotExistsErrorType'))
      }

      const operator = {}
      operator.userId = payLoad.userId
      socket.operator = operator

      next()
    } catch (err) {
      Logger.error('Error in authenticationSocketMiddleware', {
        message: err.message,
        context: socket.handshake,
        exception: err
      })
      return next(error)
    }
  })
  namespace.on('connection', (socket) => {
    socket.join(SOCKET_ROOMS.USER_WALLET + ':' + socket.operator.userId)
  })
}
