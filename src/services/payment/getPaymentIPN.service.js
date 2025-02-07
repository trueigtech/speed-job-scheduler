import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
// import { AMOUNT_TYPE, PAYMENT_PROVIDER, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'
import { BaseHandler } from '@src/libs/logicBase'
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'
import {
  NOWPAYMENT_WEBHOOK_MAPPING,
  NOWPAYMENT_WEBHOOK_STATUS
} from '@src/utils/constants/payment.constants'

export class GetPaymentIPNHandler extends BaseHandler {
  async run() {
    const {
      id,
      paymentStatus,
      paymentId,
      orderId,
      payAddress,
      priceAmount,
      payAmount,
      payCurrency
    } = this.args
    // const { id, paymentStatus, paymentId, parentPaymentId, orderId, payAddress, priceAmount, payAmount, priceCrrency, purchaseId, actuallyPaid, actuallyPaidAtFiat, payCurrency } = this.args
    const transaction = this.context.sequelizeTransaction

    try {
      // deposit/payment case
      if (orderId || paymentId) {
        if (paymentStatus === NOWPAYMENT_WEBHOOK_STATUS.WAITING) { return { success: true } }
        const user = await db.UserDepositAddress.findOne({
          where: { userId: orderId.split('-')[1], currencyCode: payCurrency }
        })

        const checkTransaction = await db.TransactionBanking.findOne({
          where: {
            transactionId: paymentId.toString(),
            status: TRANSACTION_STATUS.SUCCESS,
            transactionType: TRANSACTION_TYPE.DEPOSIT
          },
          transaction
        })
        if (checkTransaction) { return { status: 200, message: 'Transaction already processed.' } }

        const wallet = await db.Wallet.findOne({
          where: { ownerId: user.userId },
          transaction
        })
        const findTransaction = await db.TransactionBanking.findOne({
          where: { transactionId: paymentId.toString() },
          transaction
        })
        if (!findTransaction) {
          // const data = await db.TransactionBanking.create({
          //     walletId: wallet.walletId,
          //     targetId: wallet.ownerId,
          //     transactionId: payment_id,
          //     transactionType: TRANSACTION_TYPE.DEPOSIT,
          //     status: NOWPAYMENT_WEBHOOK_MAPPING[payment_status],
          //     currencyCode: pay_currency.toUpperCase(),
          //     amountType: AMOUNT_TYPE.CASH,
          //     amount: actually_paid,
          //     beforeBalance: wallet.amount,
          //     paymentProvider: PAYMENT_PROVIDER.NOWPAYMENT,
          //     moreDetails: { ...this.args }
          // }, { transaction })
        } else {
          findTransaction.status = NOWPAYMENT_WEBHOOK_MAPPING[paymentStatus]
          await findTransaction.save({ transaction })
        }
        if (
          paymentStatus === NOWPAYMENT_WEBHOOK_STATUS.PARTIALLY_PAID ||
          paymentStatus === NOWPAYMENT_WEBHOOK_STATUS.FINISHED ||
          paymentStatus === NOWPAYMENT_WEBHOOK_STATUS.CONFIRMED
        ) {
          findTransaction.status = TRANSACTION_STATUS.SUCCESS
          wallet.amount += priceAmount
          await findTransaction.save({ transaction })
          await wallet.save({ transaction })
        }
        return { success: true }
      } else if (id) { // withdrawal case
        const paymentTransaction = await db.Transaction.findOne({
          where: { transactionId: id.toString() },
          transaction
        })
        if (!paymentTransaction) { return { status: 200, message: 'Withdraw ID do not exists.' } }
        const userId = paymentTransaction.userId
        const wallet = await db.Wallet.findOne({
          where: { userId }
        })
        await paymentTransaction
          .set({
            status: paymentStatus,
            address: payAddress,
            moreDetails: {
              ...paymentTransaction.moreDetails,
              webhook: this.args
            }
          })
          .save({ transaction })
        if (
          paymentStatus === TRANSACTION_STATUS.FAILED ||
          paymentStatus === TRANSACTION_STATUS.PARTIALLY_PAID
        ) {
          await wallet
            .set({ amount: wallet.amount - payAmount })
            .save({ transaction })
        }
      }
      return { success: true }
    } catch (error) {
      console.log(error)
      throw new AppError(Errors.INTERNAL_SERVER_ERROR)
    }
  }
}
