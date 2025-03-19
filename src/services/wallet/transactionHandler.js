import db from "@src/db/models";
import { BaseHandler } from "@src/libs/logicBase";
import { LEDGER_TRANSACTION_TYPES, WALLET_OWNER_TYPES } from "@src/utils/constants/public.constants";
import { CreateLedgerHandlerService } from "./createLedgerHandler";

export class TransactionHandlerService extends BaseHandler {

  async run() {
    const {
      actioneeId,actioneeType, fromWalletOwnerId, fromWalletOwnerType, toWalletOwnerId, toWalletOwnerType, amount, currencyCode, status, purpose, paymentTransactionId,
      paymentProvider, moreDetails, transactionType
    } = this.args
    const transaction = this.dbTransaction

    const bankingTransaction = await db.Transaction.create({
      actioneeId,
      actioneeType,
      status,
      paymentProvider,
      moreDetails: moreDetails,
    }, { transaction })

    const ledger = await CreateLedgerHandlerService.execute({
      transactionId: bankingTransaction.transactionId,
      transactionType: transactionType || LEDGER_TRANSACTION_TYPES.BANKING,
      currencyCode,
      fromWalletOwnerId,
      fromWalletOwnerType,
      toWalletOwnerId,
      toWalletOwnerType,
      purpose,
      amount
    }, this.context)

    return { transaction: bankingTransaction, ledger };

  }
}
