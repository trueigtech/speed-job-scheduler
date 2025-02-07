import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import ajv from '@src/libs/ajv'
import { BaseHandler } from '@src/libs/logicBase'
import { AleaGameLaunchHandler } from '../providers/alea/aleaGameLaunchUrl.service'

const constraints = ajv.compile({
   type: 'object',
   properties: {
      gameId: { type: 'string' },
      userId: { type: 'string' },
      lang: { type: 'string' },
      coinType: { type: 'string' },
      isMobile: { type: 'boolean' },
      ipAddress: { type: 'string' }
   }
})

/**
This service is used to accept game launch in real mode
@export
@class GameLaunchHandler
@extends {BaseHandler}
*/
export class GenericGameLaunchHandler extends BaseHandler {
   get constraints() {
      return constraints
   }

   async run() {
      const { gameId, isMobile, userId = 1, isDemo, coinType } = this.args

      // Find the wallet with a positive amount and access its associated currency code
      const user = await db.User.findOne({ where: { userId } })
      if (!user || !user.isActive) throw new AppError(Errors.USER_NOT_EXISTS)

      // if (!user || !user.active) return ALEA_ERROR_TYPES.PLAYER_NOT_FOUND
      const casinoGame = await db.CasinoGame.findOne({
         where: { id: gameId, isActive: true },
         attributes: {
            include: [
               [
                  db.sequelize.literal(`(
                SELECT COUNT(*)
                FROM "favorite_games"
                WHERE "favorite_games"."casino_game_id" = "CasinoGame"."id"
              ) > 0`),
                  'isFavourite',
               ],
            ],
         },
         include: [{
            model: db.CasinoProvider,
            where: { isActive: true },
            attributes: [],
            required: true
         }]
      })

      if (!casinoGame) throw new AppError(Errors.GAME_NOT_FOUND)
      const gameLauchUrl = await AleaGameLaunchHandler.execute({ providerCasinoGameId: casinoGame.casinoGameId, gameId: casinoGame.id, isMobile, userId, isDemo, coin: coinType })
      return { gameLauchUrl, isFavourite: casinoGame?.dataValues?.isFavourite || false }
   }
}
