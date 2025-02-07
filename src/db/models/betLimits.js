'use strict'

module.exports = function (sequelize, DataTypes) {
  const BetLimit = sequelize.define('BetLimit', {
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
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timeLimitExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    timeLimitUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dailyBetLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dailyBetExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dailyBetUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    weeklyBetLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weeklyBetExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    weeklyBetUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    monthlyBetLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monthlyBetExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    monthlyBetUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dailyLossLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dailyLossExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dailyLossUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    weeklyLossLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weeklyLossExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    weeklyLossUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    monthlyLossLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monthlyLossExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    monthlyLossUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    selfExclusion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isSelfExclusionPermanent: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    selfExclusionType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    selfExclusionUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bet_limits',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  BetLimit.associate = function (model) {
    BetLimit.belongsTo(model.User, {
      foreignKey: 'userId',
      constraints: false
    })
    BetLimit.belongsTo(model.Currency, {
      foreignKey: 'currencyCode',
      targetKey: 'code',
      constraints: false
    })
  }

  return BetLimit
}
