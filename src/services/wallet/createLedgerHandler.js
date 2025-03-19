import db from "@src/db/models";
import { AppError } from "@src/errors/app.error";
import { Errors } from "@src/errors/errorCodes";
import { BaseHandler } from "@src/libs/logicBase";
import { MathPrecision } from "@src/libs/mathOperation";
import WalletEmitter from "@src/socket-resources/emmitter/wallet.emmitter";
import { COINS, LEDGER_TYPES, WALLET_OWNER_TYPES } from "@src/utils/constants/public.constants";

export class CreateLedgerHandlerService extends BaseHandler {
  get constraints () {
    return constraints;
  }

  async run () {
    const {
      transactionId,
      transactionType,
      currencyCode,
      fromWalletOwnerId,
      fromWalletOwnerType,
      toWalletOwnerId,
      toWalletOwnerType,
      purpose,
      amount,
    } = this.args;

    const transaction = this.dbTransaction; // Initialize local transaction

    const fromWallet = await db.Wallet.findOne({
      where: { ownerId: fromWalletOwnerId, ownerType: fromWalletOwnerType, currencyCode },
      lock: true, // Lock row to prevent race conditions
      transaction,
    });

    if (!fromWallet) throw new AppError(Errors.FROM_WALLET_NOT_FOUND);

    const toWallet = await db.Wallet.findOne({
      where: { ownerId: toWalletOwnerId, ownerType: toWalletOwnerType, currencyCode },
      lock: true, // Lock row to prevent race conditions
      transaction,
    });

    if (!toWallet) {
      throw new AppError(Errors.TO_WALLET_NOT_FOUND);
    }

    if (fromWalletOwnerId !== 1 || fromWalletOwnerType !== WALLET_OWNER_TYPES.ADMIN) {
      if (+fromWallet.balance < +amount) {
        throw new AppError(Errors.INSUFFICIENT_FUNDS);
      }
      fromWallet.balance = MathPrecision.minus(fromWallet.balance, amount);
    }
    toWallet.balance = MathPrecision.plus(toWallet.balance, amount);
    // Save ledger entry
    const ledger = await db.Ledger.create(
      {
        transactionId,
        transactionType,
        purpose,
        amount,
        fromWalletId: fromWallet.id,
        toWalletId: toWallet.id,
        currencyCode,
      },
      { transaction }
    );

    // Save wallet with updated balance
    await toWallet.save({ transaction });
    await fromWallet.save({ transaction });

    WalletEmitter.emitUserWalletBalance({
      walletId: fromWalletOwnerType === WALLET_OWNER_TYPES.USER ? fromWallet.id : toWallet.id,
      currencyCode,
      balance: fromWalletOwnerType === WALLET_OWNER_TYPES.USER ? fromWallet.balance : toWallet.balance,
    }, fromWalletOwnerType === WALLET_OWNER_TYPES.USER ? fromWallet.ownerId : toWallet.ownerId)


    return {
      ...ledger,
      updatedFromWalletBalance: fromWallet.balance,
      updatedToWalletBalance: toWallet.balance,
    };
  }
}
