'use strict';

module.exports = function (sequelize, DataTypes) {
  const Package = sequelize.define('Package', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0.0
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gcCoin: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    scCoin: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVisibleInStore: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // orderId: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0
    // },
    // validTill: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },
    // validFrom: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },
    // customizationSettings: {
    //   type: DataTypes.JSONB,
    //   allowNull: true
    // },
    // maxPurchasePerUser: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    discountAmount: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    // discountEndDate: {
    //   allowNull: true,
    //   type: DataTypes.DATE
    // },
    //  The price of the package decreases after certain thresholds are met (e.g., after 100 and 500 purchases).
    // rules: [
    //  { threshold: 100, newPrice: 44.99 },  // Price drops after 100 purchases
    //  { threshold: 500, newPrice: 39.99 }   // Further price drop after 500 purchases
    // ]
    // pricingTiers: {
    //   type: DataTypes.JSONB,
    //   allowNull: true
    // },
    // bonusId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // giftable: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // },
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
    tableName: 'packages',
    schema: 'public',
    timestamps: true,
    underscored: true
  })
  // Package.associate = function (model) {
  //   Package.belongsTo(model.Bonus, { foreignKey: 'bonusId' })
  // }

  return Package
}
