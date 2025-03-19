'use strict';

module.exports = function (sequelize, DataTypes) {
    const Reward = sequelize.define(
        'Reward',
        {
            rewardId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                description: 'Unique identifier for each reward.',
            },
            vipTierId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cashBonus: {
                type: DataTypes.INTEGER,
                allowNull: false,
                description: 'Total amount of bonus',
            },
            rackback: {
                type: DataTypes.INTEGER,
                allowNull: false,
                description: 'Return some percentage of lost amount to user',
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                description: 'Indicates if this reward is currently active.',
            },
        },
        {
            sequelize,
            modelName: 'Reward',
            tableName: 'rewards',
            schema: 'public',
            timestamps: true,
            underscored: true,
        }
    );

    Reward.associate = function (models) {
        Reward.belongsTo(models.VipTier, { foreignKey: 'vipTierId', as: 'viptier' });
    };

    return Reward;
};