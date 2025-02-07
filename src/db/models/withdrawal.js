'use strict'

const { DataTypes } = require('sequelize')
import { WITHDRAWAL_STATUS } from '@src/utils/constants/public.constants'

module.exports = (sequelize) => {
  const Withdrawal = sequelize.define(
    'Withdrawal',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(Object.values(WITHDRAWAL_STATUS)),
        allowNull: false,
        defaultValue: WITHDRAWAL_STATUS.PENDING
      },
    //   type: {
    //     type: DataTypes.ENUM(Object.values(WITHDRAWAL_TYPES)),
    //     allowNull: false
    //   },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      approvedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'withdrawals',
      timestamps: true,
      underscored: true
    }
  )

  Withdrawal.associate = (models) => {
    Withdrawal.belongsTo(models.User, { foreignKey: 'userId'})
    Withdrawal.hasMany(models.TransactionLedger, {
      foreignKey: 'transactionId',
      as : 'withdrawalLedger',
      onDelete: 'cascade',
      scope: {
        transaction_type: 'withdraw'
      }

    })
  }

  return Withdrawal
}
