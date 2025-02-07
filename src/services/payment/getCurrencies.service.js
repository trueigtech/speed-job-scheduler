import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from '@src/libs/logicBase';
import axios from 'axios';


export class GetPaymentCurrencyHandler extends BaseHandler {
    async run() {
        try {
            console.log(nowpaymentsConfig.url + '/v1/currencies?fixed_rate=true')
            const response = await axios({
                method: 'GET',
                url: nowpaymentsConfig.url + '/currencies?fixed_rate=true',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': nowpaymentsConfig.apiKey
                },
            })
            if (!response) throw new AppError(Errors.PAYMENT_FAILED)
            const data = response.data.currencies
            return data

        } catch (error) {
            throw new AppError(Errors.INTERNAL_SERVER_ERROR)
        }
    }
}
