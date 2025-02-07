'use strict'

module.exports = function (sequelize, DataTypes) {
  const UserDetails = sequelize.define('UserDetails', {
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
    deviceType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    selfExclusion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    selfExclusionUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    disableReason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vipTierId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nextVipTierId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1.1.1.1'
    },
    newPasswordKey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    newPasswordRequested: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'user_details',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['userId']
      }
    ]
  })

  UserDetails.associate = function (model) {
    UserDetails.belongsTo(model.User, {
      foreignKey: 'userId',
      constraints: false
    })
    UserDetails.belongsTo(model.VipTier, {
      foreignKey: 'vipTierId',
      constraints: false
    })
    UserDetails.belongsTo(model.VipTier, {
      foreignKey: 'nextVipTierId',
      as: 'nextVipTier',
      constraints: false
    })
  }

  return UserDetails
}
