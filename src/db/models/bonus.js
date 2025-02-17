'use strict'
import { BONUS_STATUS, BONUS_TYPE } from '@src/utils/constants/bonus.constants'

module.exports = (sequelize, DataTypes) => {
  const Bonus = sequelize.define('Bonus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    bonusType: {
      type: DataTypes.ENUM(Object.values(BONUS_TYPE)),
      allowNull: false
    },
    promotionTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gcAmount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    scAmount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    minPurchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true // applicable for purchase bonuses
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    minWagerAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true // minimum amount required to wager
    },
    eligibleGames: {
      type: DataTypes.STRING, // can be a JSON array of game IDs
      allowNull: true // which games count towards the wagering
    },
    maxBonusLimit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true // for deposit/wager bonuses
    },
    wagerMultiplier: {
      type: DataTypes.INTEGER,
      allowNull: true // for wager-based bonuses
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true // for referral bonuses
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true // optional for bonus image
    },
    status: {
      type: DataTypes.ENUM(Object.values(BONUS_STATUS)),
      defaultValue: BONUS_STATUS.ACTIVE
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true // optional for further bonus details
    },
    termsConditions: {
      type: DataTypes.TEXT,
      allowNull: true // store specific terms for each bonus
    }
  }, {
    tableName: 'bonuses',
    timestamps: true
  })

  // Associations can be defined here
  Bonus.associate = (models) => {
    Bonus.hasMany(models.UserBonus, {
      foreignKey: 'bonusId',
      as: 'userBonus'
    })
  }

  return Bonus
}
