import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { LEDGER_DIRECTIONS, LEDGER_TRANSACTION_TYPES } from '@src/utils/constants/public.constants'
import { CreateLedgerHandlerHandler } from './createLedgerHandler'


export class TransactionHandlerHandler extends BaseHandler {
  get constraints() {
    return constraints
  }

  async run() {
    const {
      adminId, userId, amount, currencyCode, status, purpose, paymentTransactionId,
      paymentProvider, moreDetails
    } = this.args
    const transaction = this.dbTransaction

    const bankingTransaction = await db.Transaction.create({
      userId,
      actioneeId: adminId,
      purpose: purpose,
      paymentProviderId: paymentProvider, moreDetails,
      status
    }, { transaction })

    const ledger = await CreateLedgerHandlerHandler.execute({
      transactionId: bankingTransaction.transactionId,
      transactionType: LEDGER_TRANSACTION_TYPES.BANKING,
      currencyCode,
      userId,
      direction: LEDGER_DIRECTIONS[purpose],
      amount
    }, this.context)

    return { transaction: { ...bankingTransaction, ledger } }
  }
}

