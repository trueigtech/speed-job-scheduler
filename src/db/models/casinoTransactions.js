"use strict";
import { TRANSACTION_STATUS } from "@src/utils/constant";

module.exports = (sequelize, DataTypes) => {
  const CasinoTransaction = sequelize.define(
    "CasinoTransaction",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
      },
      casinoGameId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gameRoundId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "game round id",
      },
      status: {
        type: DataTypes.ENUM(Object.values(TRANSACTION_STATUS)),
        allowNull: false,
        defaultValue: TRANSACTION_STATUS.PENDING,
      },
      moreDetails: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "casino_transactions",
      schema: "public",
      timestamps: true,
      underscored: true,
    }
  );

  CasinoTransaction.associate = function (models) {
    CasinoTransaction.belongsTo(models.User, {
      foreignKey: "userId",
    });
    CasinoTransaction.hasMany(models.Ledger, {
      foreignKey: "transactionId",
      as: "casinoLedger",
      onDelete: "cascade",
      scope: {
        transaction_type: "casino",
      },
    });
    CasinoTransaction.belongsTo(models.CasinoGame, {
      foreignKey: "casinoGameId",
      targetKey: "casinoGameId",
    });
  };

  return CasinoTransaction;
};
