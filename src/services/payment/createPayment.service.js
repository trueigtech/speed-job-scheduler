import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import Logger from '@src/libs/logger'
import { BaseHandler } from '@src/libs/logicBase'
import axios from 'axios'

export class CreatePaymentHandler extends BaseHandler {
  async run() {
    try {
      // const { amount, currency, userId } = this.args
      const { currency, userId } = this.args
      const depositAddress = await db.UserDepositAddress.findOne({
        where: { currencyCode: currency, userId },
        attributes: ['address']
      })
      if (depositAddress) return { address: depositAddress.address }
      const orderId = 'TG-' + userId + '-' + Math.random().toString().substring(2, 8)
      const options = {
        price_amount: 1000,
        price_currency: 'usd',
        pay_currency: currency,
        ipn_callback_url: config.get('app.userBackendUrl') + '/api/v1/payment/get-payment-status',
        order_id: orderId,
        order_description: 'Deposit Request',
        is_fixed_rate: true,
        is_fee_paid_by_user: true
        // payin_extra_id: userId
      }

      const response = await axios({
        method: 'POST',
        url: config.get('nowPayment.url') + '/v1/payment',
        headers: {
          'x-api-key': config.get('nowPayment.apiKey'),
          'Content-Type': 'application/json'
        },
        data: options
      })
      if (!response) throw new AppError(Errors.PROVIDER_INACTIVE)
      const data = response.data
      await db.UserDepositAddress.create({
        userId: userId,
        address: data.pay_address,
        currencyCode: currency
      })

      return { address: data.pay_address }
    } catch (error) {
      Logger.info('Error in payment', { exception: error })
      throw new AppError(Errors.INTERNAL_ERROR)
    }
  }
}
