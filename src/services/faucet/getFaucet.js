import db from "@src/db/models"
import { AppError } from "@src/errors/app.error"
import { Errors } from "@src/errors/errorCodes"
import { dayjs } from "@src/libs/dayjs"
import { BaseHandler } from "@src/libs/logicBase"
import { GLOBAL_SETTING } from "@src/utils/constant"
import { TRANSACTION_PURPOSE } from "@src/utils/constants/public.constants"
import { SUCCESS_MSG } from "@src/utils/success"

export class GetFaucetHandler extends BaseHandler {
  async run() {
    const { userId, currencyCode } = this.args
    const transaction = this.dbTransaction

    // Fetch the user's last faucet transaction
    const lastFaucetAwail = await db.Transaction.findOne({
      where: { userId, purpose: TRANSACTION_PURPOSE.FAUCET_AWAIL },
      attributes: ['createdAt'],
      order: [['createdAt', 'DESC']],
      transaction,
    })

    // Fetch faucet settings
    const faucet = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.FAUCET_SETTING },
      transaction,
    })

    if (!faucet) {
      throw new AppError(Errors.FAUCET_SETTING_NOT_FOUND) // Handle missing faucet settings
    }

    // Check if the user has already availed of the faucet recently
    if (lastFaucetAwail) {
      const timeDifference = dayjs().diff(dayjs(lastFaucetAwail.createdAt))
      if (timeDifference < faucet.value.interval) {
        return {
          isAvailable: false,
          timeRemainingForNextFaucet: faucet.value.interval - timeDifference,
          message: SUCCESS_MSG.GET_SUCCESS,
        }
      }
    }

    // Fetch the user's details and wallet balance
    const user = await db.User.findOne({
      where: { userId },
      attributes: ['createdAt'],
      include: [
        {
          model: db.Wallet,
          as: 'userWallet',
          attributes: ['balance'],
          where: { currencyCode },
        },
      ],
      transaction,
    })

    if (!user) throw new AppError(Errors.USER_NOT_EXISTS)


    // Check if the user was created less than 5 minutes ago
    const timeSinceCreation = dayjs().diff(dayjs(user.createdAt), 'minute')
    if (timeSinceCreation < 5) {
      return {
        isAvailable: false,
        timeRemainingForNextFaucet: (5 - timeSinceCreation) * 60 * 1000, // Remaining time in milliseconds
        message: "User must wait at least 5 minutes after account creation to claim the faucet.",
      }
    }

    // Check if the user's wallet balance is 0
    const userWallet = user.userWallet
    const balance = userWallet[0]?.balance

    if (balance > 0) throw new AppError(Errors.BALANCE_MUST_BE_ZERO)

    // Allow faucet claim
    return {
      isAvailable: true,
      message: SUCCESS_MSG.GET_SUCCESS,
    }
  }
}
