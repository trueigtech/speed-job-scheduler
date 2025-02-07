import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { AMOUNT_TYPE, PAYMENT_PROVIDER, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'
import axios from 'axios'
import { GetAuthenticationTokenHandler } from './getAuthToken.service'

export class WithdrawAmountHandler extends BaseHandler {
  async run() {
    const { address, currency, userId, amount } = this.args
    const transaction = this.context.sequelizeTransaction

    const wallet = await db.Wallet.findOne({
      where: { ownerId: userId },
      transaction
    })

    if (wallet.amount < amount) throw new AppError(Errors.BALANCE)

    // Make payout
    const { result: token } = await GetAuthenticationTokenHandler.execute()
    const response = await axios({
      method: 'POST',
      url: config.get('nowPayment.url') + '/v1/payout',
      headers: {
        'x-api-key': config.get('nowPayment.apiKey'),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`
      },
      data: {
        ipn_callback_url: config.get('app.userBackendUrl') + '/api/v1/payment/get-payment-status',
        withdrawals: [
          {
            address,
            currency,
            amount,
            ipn_callback_url: config.get('app.userBackendUrl') + '/api/v1/payment/get-payment-status'
          }
        ]
      }
    })

    const data = response.data?.withdrawals || []

    if (data.length) {
      for (const withdraws of data) {
        await db.TransactionBanking.create({
          walletId: wallet.walletId,
          targetId: wallet.ownerId,
          transactionId: withdraws.id,
          transactionType: TRANSACTION_TYPE.WITHDRAW,
          status: TRANSACTION_STATUS.PENDING,
          currencyCode: currency.toUpperCase(),
          amountType: AMOUNT_TYPE.CASH,
          // amount: price_amount,
          amount: 0, // edited
          beforeBalance: wallet.amount,
          paymentProvider: PAYMENT_PROVIDER.NOWPAYMENT,
          moreDetails: { payout: withdraws }
        }, { transaction })
      }
    }
    return { success: true }
  } catch(error) {
    console.log(error)
    throw new AppError(Errors.INTERNAL_SERVER_ERROR)
  }
}
