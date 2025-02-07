import { config } from '@src/configs/config';
import HandlerError from '@src/errors/service.error';
import axios from 'axios';
import { BaseHandler } from '@src/libs/logicBase';

export class ValidateWalletAddress extends BaseHandler {
    async run() {

      try {
            const data = JSON.stringify({
                address: this.args.address,
                currency: this.args.currencyCode,
                extra_id: null
            })
            const resConfig = {
                method: 'post',
                maxBodyLength: Infinity,
                url: config.get('now_payment.payment_url') + '/payout/validate-address',
                headers: {
                    'x-api-key': config.get('now_payment.api_key'),
                    'Content-Type': 'application/json'
                },
                data
            }
            const response = await axios(resConfig)

            return response.data
        } catch (err) {
            throw new HandlerError(err)
        }
    }
 }
