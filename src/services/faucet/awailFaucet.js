import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { GLOBAL_SETTING } from "@src/utils/constant";
import { TRANSACTION_PURPOSE } from "@src/utils/constants/public.constants";
import { SUCCESS_MSG } from "@src/utils/success";
import { TransactionHandlerHandler } from "../wallet";
import { GetFaucetHandler } from "./getFaucet";

export class AvailFaucetHandler extends BaseHandler {
  async run() {
    const { userId, currencyCode } = this.args

    const checkFaucetAvailability = await GetFaucetHandler.execute(this.args)

    if (!checkFaucetAvailability.isAvailable)
      return checkFaucetAvailability

    const faucet = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.FAUCET_SETTING },
      transaction: this.dbTransaction
    })
    const amount = faucet.value[currencyCode]
    const purpose = TRANSACTION_PURPOSE.FAUCET_AWAIL

    const makeTransaction = await TransactionHandlerHandler.execute({ userId, amount, currencyCode, purpose }, this.context)

    return { makeTransaction, message: SUCCESS_MSG.AVAIL_FAUCET }
  }
}
