'use strict'

const {  TRANSACTION_PURPOSE } = require("@src/utils/constants/public.constants")

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        transactionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refrences: {
                model: 'users',
                key: 'user_id'
            }
        },
        // paymentProviderId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     refrences: {
        //         model: 'payment_providers',
        //         key: 'payment_provider_id'
        //     }
        // },
        // packageId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        //   },
        actioneeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            refrences: {
                model: 'admin_users',
                key: 'admin_user_id'
            }
        },
        purpose: {
            type: DataTypes.ENUM(Object.values(TRANSACTION_PURPOSE)),
            allowNull: false
        },
        moreDetails: {
            type: DataTypes.JSONB(),
            allowNull: true,
        }
    }, {
        tableName: 'transactions',
        timestamps: true,
        underscored: true
    })

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: 'userId' })
        // Transaction.belongsTo(models.PaymentProvider, { foreignKey: 'paymentProviderId' })
        Transaction.hasMany(models.TransactionLedger, {
            foreignKey: 'transactionId', as: 'bankingLedger', onDelete: 'cascade', scope: {
                transaction_type: 'banking',
            }
        })
    }

    return Transaction
}
