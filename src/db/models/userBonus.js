'use strict'

const { BONUS_STATUS } = require('@src/utils/constants/bonus.constants')

module.exports = (sequelize, DataTypes) => {
  const UserBonus = sequelize.define('UserBonus', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bonusId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // bonusAmount: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false // Amount awarded to the user
    // },
    gcAmount: {
      type: DataTypes.DOUBLE(10, 2),
      defaultValue: 0.0
    },
    scAmount: {
      type: DataTypes.DOUBLE(10, 2),
      defaultValue: 0.0
    },
    wageredAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0 // Track the amount wagered by the user
    },
    wagerRequirement: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false // Total amount the user needs to wager
    },
    remainingWagerRequirement: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0 // Remaining amount left to wager
    },
    bonusStatus: {
      type: DataTypes.ENUM(Object.values(BONUS_STATUS)),
      defaultValue: 'active' // Status of the bonus for the user
    },
    awardedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Date when the bonus was awarded
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true // Expiry date for the user-specific bonus
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true // Code used by referred player (only for referral bonuses)
    },
    purchaseAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true // Deposit amount tied to the purchase bonus
    }
  }, {
    tableName: 'user_bonuses',
    timestamps: true
  })

  // Associations
  UserBonus.associate = (models) => {
    UserBonus.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
    UserBonus.belongsTo(models.Bonus, {
      foreignKey: 'bonusId',
      as: 'bonus'
    })
  }

  return UserBonus
}
