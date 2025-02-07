'use strict'
// Global countries
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    countryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    kycMethod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    restrictedProviders: {
      type: DataTypes.JSONB
    },
    restrictedGames: {
      type: DataTypes.JSONB
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'countries',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  Country.associate = function (models) {
    Country.belongsTo(models.Language, {
      foreignKey: 'languageId',
      as: 'language'
    })
    Country.hasMany(models.User, {
      foreignKey: 'countryCode',
      sourceKey: 'code',
      as: 'users'
    })
  }

  return Country
}
