'use strict'

module.exports = function (sequelize, DataTypes) {
  const UserTierProgress = sequelize.define(
    'UserTierProgress',
    {
      vipTierId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wageringThreshold: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        description: 'Minimum spend amount required for this tier'
      },
      gamesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        description: 'Minimum total games played to qualify for this tier'
      },
      bigBetsThreshold: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        description: 'Number of bets above a specific amount (defined in the next field)'
      },
      depositsThreshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        description: 'Total deposit amount required to qualify for this tier.'
      },
      loginStreak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        description: 'Consecutive daily logins required for qualification.'
      },
      referralsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        description: 'Minimum number of referrals required to qualify.'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        description: 'Indicates if this VIP tier is currently active.'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'UserTierProgress',
      tableName: 'user_tier_progress',
      schema: 'public',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['userId', 'vipTierId', 'isActive']
        }
      ]
    }
  )

  UserTierProgress.associate = function (models) {
    UserTierProgress.belongsTo(models.VipTier, { foreignKey: 'vipTierId', as: 'viptier' })
    UserTierProgress.belongsTo(models.User, { foreignKey: 'userId', as: 'userTierProgresses', constraints: false })
  }

  return UserTierProgress
}
