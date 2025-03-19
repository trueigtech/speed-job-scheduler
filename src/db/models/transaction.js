"use strict"

const { TRANSACTION_STATUS, PAYMENT_PROVIDER } = require("@src/utils/constant")
const {
  WALLET_OWNER_TYPES,
} = require("@src/utils/constants/public.constants")

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      actioneeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actioneeType: {
        type: DataTypes.ENUM(Object.values(WALLET_OWNER_TYPES)),
        allowNull: false,
      },
      paymentProvider: {
        type: DataTypes.ENUM(Object.values(PAYMENT_PROVIDER)),
        allowNull: true
      },
      providerPaymentId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      withdrawalId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(Object.values(TRANSACTION_STATUS)),
        defaultValue: TRANSACTION_STATUS.PENDING,
        allowNull: true,
      },
      moreDetails: {
        type: DataTypes.JSONB(),
        allowNull: true,
      },
    },
    {
      tableName: "transactions",
      timestamps: true,
      underscored: true,
    }
  )

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: "actioneeId",
      constraint: false,
      scope: { actionee_type: WALLET_OWNER_TYPES.USER }
    })
    Transaction.belongsTo(models.AdminUser, {
      foreignKey: "actioneeId",
      constraint: false,
      scope: { actionee_type: WALLET_OWNER_TYPES.USER }
    })
    // Transaction.belongsTo(models.PaymentProvider, { foreignKey: 'paymentProviderId' })
    Transaction.hasMany(models.Ledger, {
      foreignKey: "transactionId",
      as: "bankingLedger",
      onDelete: "cascade",
      scope: {
        transaction_type: "banking",
      },
    })
    Transaction.belongsTo(models.Withdrawal, {
      foreignKey: "withdrawalId",
      as: 'withdrawalTransaction',
      onDelete: "cascade",
    })
  }

  return Transaction
}
