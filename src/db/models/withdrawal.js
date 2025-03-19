"use strict";

const { DataTypes } = require("sequelize");
import { WALLET_OWNER_TYPES, WITHDRAWAL_STATUS } from "@src/utils/constants/public.constants";

module.exports = (sequelize) => {
  const Withdrawal = sequelize.define(
    "Withdrawal",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      actioneeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      actioneeType: {
        type: DataTypes.ENUM(Object.values(WALLET_OWNER_TYPES)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(Object.values(WITHDRAWAL_STATUS)),
        allowNull: false,
        defaultValue: WITHDRAWAL_STATUS.PENDING,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      approvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "withdrawals",
      timestamps: true,
      underscored: true,
    }
  );

  Withdrawal.associate = (models) => {
    Withdrawal.belongsTo(models.User, {
      foreignKey: "actioneeId",
      constraint: false,
      // scope: { actionee_type: WALLET_OWNER_TYPES.USER }
    })
    Withdrawal.belongsTo(models.AdminUser, {
      foreignKey: "actioneeId",
      constraint: false,
      // scope: { actionee_type: WALLET_OWNER_TYPES.ADMIN }
    })
    Withdrawal.hasMany(models.Ledger, {
      foreignKey: "transactionId",
      as: "withdrawalLedger",
      onDelete: "cascade",
      scope: {
        transaction_type: "banking",
      },
    });
    Withdrawal.hasMany(models.Transaction, {
      foreighKey: 'withdrwalId',
      as: 'withdrawalTransaction',
      onDelete: 'cascade'
    })
  };

  return Withdrawal;
};
