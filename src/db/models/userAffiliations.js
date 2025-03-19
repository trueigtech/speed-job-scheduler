'use strict'
module.exports = function (sequelize, DataTypes) {
  const UserAffiliations = sequelize.define('UserAffiliations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uplineId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: 'userId of affiliate User'
    },
    downlineId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: 'userId of reffered User'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    earnedCommission: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'user_affiliations',
    schema: 'public',
    timestamps: true,
    underscored: true

  })
  UserAffiliations.associate = function (model) {
    UserAffiliations.belongsTo(model.User, { foreignKey: 'uplineId' })
    UserAffiliations.belongsTo(model.User, { foreignKey: 'downlineId' })
  }
  return UserAffiliations
}
