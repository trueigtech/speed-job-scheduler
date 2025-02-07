
'use strict'
module.exports = (sequelize, DataTypes) => {
  const FreespinBonus = sequelize.define('FreespinBonus', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    currencyId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    bonusId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    providerId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    gameIds: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    freespinQuantity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bonusCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    betValue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    response: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'freespin_bonus',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  FreespinBonus.associate = function (models) {
    FreespinBonus.belongsTo(models.Bonus, { foreignKey: 'bonusId', onDelete: 'cascade' })
    FreespinBonus.belongsTo(models.Currency, { foreignKey: 'currencyId' })
    FreespinBonus.belongsTo(models.CasinoProvider, { foreignKey: 'providerId' })
  }
  return FreespinBonus
}
