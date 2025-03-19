"use strict";

import {
  LEDGER_PURPOSE,
  LEDGER_TRANSACTION_TYPES
} from "@src/utils/constants/public.constants";

module.exports = (sequelize, DataTypes) => {
  const Ledger = sequelize.define(
    "Ledger",
    {
      ledgerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionType: {
        type: DataTypes.ENUM(Object.values(LEDGER_TRANSACTION_TYPES)),
        allowNull: false,
      },
      fromWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      toWalletId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "currencies",
          key: "code",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      purpose: {
        type: DataTypes.ENUM(Object.values(LEDGER_PURPOSE)),
        allowNull: false,
      },
    },
    {
      tableName: "ledgers",
      timestamps: true,
      underscored: true,
    }
  );

  Ledger.associate = (models) => {
    Ledger.belongsTo(models.Transaction, {
      foreignKey: "transactionId",
      constraints: false,
      as: "bankingLedger",
    })
    Ledger.belongsTo(models.CasinoTransaction, {
      foreignKey: "transactionId",
      constraints: false,
      as: "casinoLedger",
    })
    Ledger.belongsTo(models.Withdrawal, {
      foreignKey: "transactionId",
      constraints: false,
      as: "withdrawalLedger",
    })
    Ledger.belongsTo(models.Wallet, { foreignKey: "fromWalletId" })
    Ledger.belongsTo(models.Wallet, { foreignKey: "toWalletId" })
    Ledger.belongsTo(models.Currency, { foreignKey: "currencyCode" })
  }

  return Ledger
};
