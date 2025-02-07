'use strict'

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'EN',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // signInType: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phoneCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isInternalUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    refParentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    other: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    underscored: true,
    paranoid: false
  })

  User.associate = function (model) {
    User.hasMany(model.Wallet, { as: 'userWallet', foreignKey: 'userId', onDelete: 'cascade' })
    User.hasMany(model.CasinoFavoriteGame, { foreignKey: 'userId', onDelete: 'cascade' })
    User.hasMany(model.CasinoTransaction, { as: 'casinoTransactions', foreignKey: 'userId', onDelete: 'cascade' })
    User.hasMany(model.UserAffiliations, { foreignKey: 'affiliateUserId' });
    User.hasOne(model.UserAffiliations, { foreignKey: 'referredUserId' });
    User.belongsTo(model.User, { foreignKey: 'refParentId', as: 'referrer' })
    User.hasMany(User, { foreignKey: 'refParentId', as: 'referredUsers' });
    User.hasOne(model.UserDetails, { foreignKey: 'userId', as: 'userDetails', constraints: false, onDelete: 'cascade' })
    User.hasMany(model.UserBonus, { foreignKey: 'userId', as: 'bonus', constraints: false, onDelete: 'cascade' })
    User.hasMany(model.Withdrawal, { foreignKey: 'userId' })
    User.hasMany(model.BonusClaim, { foreignKey: 'userId', as: 'bonusClaims', onDelete: 'cascade' });
    User.hasOne(model.Limit, { foreignKey: 'userId', as: 'userLimits', constraints: false, onDelete: 'cascade' })
    User.hasMany(model.UserTierProgress, { foreignKey: 'userId', as: 'userTierProgresses' })
  }

  return User
}