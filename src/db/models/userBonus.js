
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gcAmount: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    scAmount: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    awardedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    referralCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    purchaseAmount: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: true // Purchase amount tied to the purchase bonus
    }
  }, {
    tableName: 'user_bonuses',
    timestamps: true
  });

  UserBonus.associate = (models) => {
    UserBonus.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    UserBonus.belongsTo(models.Bonus, {
      foreignKey: 'bonusId',
      as: 'userBonus'
    });
  };

  return UserBonus;
};
