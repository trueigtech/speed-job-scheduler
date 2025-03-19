const { WALLET_OWNER_TYPES } = require("@src/utils/constants/public.constants")

/**
 * @function
 * @param {import("sequelize").Sequelize} sequelize
 */
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "Wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ownerType: {
        type: DataTypes.ENUM(Object.values(WALLET_OWNER_TYPES)),
        allowNull: false,
      },
      currencyCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
          model: "currencies",
          key: "code",
        },
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "wallets",
    }
  )

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: "ownerId",
      constraint: false,
      scope: { owner_type: WALLET_OWNER_TYPES.ADMIN }
    })
    Wallet.belongsTo(models.AdminUser, {
      foreignKey: "ownerId",
      constraint: false,
      scope: { owner_type: WALLET_OWNER_TYPES.ADMIN }
    })
    Wallet.belongsTo(models.Currency,
      { foreignKey: "currencyCode" }
    )
    Wallet.hasMany(models.Ledger, {
      foreignKey: "toWalletId",
      onDelete: "CASCADE",
    })
    Wallet.hasMany(models.Ledger, {
      foreignKey: "fromWalletId",
      onDelete: "CASCADE",
    })
  }
  return Wallet
}
