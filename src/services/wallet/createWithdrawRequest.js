import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { COINS, LEDGER_DIRECTIONS, LEDGER_TRANSACTION_TYPES, TRANSACTION_PURPOSE, WITHDRAWAL_STATUS } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'
import { CreateLedgerHandlerHandler } from './createLedgerHandler'

export class CreateWithdrawRequestHandler extends BaseHandler {
  async run() {
    let { amount, userId, } = this.args
    const transaction = this.dbTransaction


    // Create Withdrawal Request with Transaction ID
    const withdrawalRequest = await db.Withdrawal.create(
      { userId, amount, status: WITHDRAWAL_STATUS.PENDING, },
      { transaction }
    )

    // Use Transaction Ledger Handler
    const ledgerEntry = await CreateLedgerHandlerHandler.execute({
      transactionId: withdrawalRequest.id,
      transactionType: LEDGER_TRANSACTION_TYPES.WITHDRAW,
      userId,
      direction: LEDGER_DIRECTIONS[TRANSACTION_PURPOSE.REDEEM],
      amount,
      currencyCode: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
    }, this.context)

    return {
      success: true,
      message: SUCCESS_MSG.CREATE_SUCCESS,
      withdrawalRequest,
      updatedBalance: ledgerEntry.updatedBalance
    }
  }
}
