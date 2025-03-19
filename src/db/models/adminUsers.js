"use strict";

const { WALLET_OWNER_TYPES } = require("@src/utils/constants/public.constants");

module.exports = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define(
    "AdminUser",
    {
      adminUserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      adminRoleId: {
        type: DataTypes.INTEGER,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      commission: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 5,
      },
      permission: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "admin_users",
      schema: "public",
      timestamps: true,
    }
  );

  AdminUser.associate = (models) => {
    AdminUser.belongsTo(models.AdminRole, {
      foreignKey: "adminRoleId",
    });
    AdminUser.hasMany(models.AffiliateRequest, {
      foreignKey: "actionId",
      as: "actionAffiliateRequests",
      constraints: false,
    });
    AdminUser.hasMany(models.Wallet, {
      as: "adminWallet",
      foreignKey: "ownerId",
      constraints: false,
      scope: { owner_type: WALLET_OWNER_TYPES.ADMIN },
      onDelete: "cascade",
    });
    AdminUser.hasMany(models.Transaction, {
      foreignKey: "actioneeId",
      constraints: false, onDelete: "cascade",
      scope: { actionee_type: WALLET_OWNER_TYPES.ADMIN }
    });
    AdminUser.hasMany(models.Withdrawal, {
      foreignKey: "actioneeId",
      constraints: false,
      onDelete: "cascade",
      scope: { actionee_type: WALLET_OWNER_TYPES.ADMIN }
    });
  };

  return AdminUser;
};
