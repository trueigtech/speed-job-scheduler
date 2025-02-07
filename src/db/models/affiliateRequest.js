'use strict'

module.exports = function (sequelize, DataTypes) {
  const AffiliateRequest = sequelize.define('AffiliateRequest', {
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
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'REREQUESTED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    actionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'affiliate_requests',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  AffiliateRequest.associate = function (model) {
    AffiliateRequest.belongsTo(model.User, {
      foreignKey: 'userId',
      constraints: false
    })
    AffiliateRequest.belongsTo(model.AdminUser, {
      foreignKey: 'actionId',
      as: 'actionAdminUser',
      constraints: false
    })
  }

  return AffiliateRequest
}
