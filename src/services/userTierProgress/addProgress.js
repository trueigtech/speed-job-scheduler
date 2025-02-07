import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { dayjs } from '@src/libs/dayjs'


export class AddUserTierProgressHandler extends BaseHandler {

    async run() {
        const { userId, casinoGameId, ...updateFields } = this.args;
        const transaction = this.context.sequelizeTransaction

        const userDetails = await db.UserDetails.findOne({
            where: { userId },
            attributes: ['userId', 'vipTierId', 'nextVipTierId'],
            include: [
                {
                    model: db.VipTier,
                    as: 'nextVipTier',
                    // attributes: ['vipTierId', 'level', 'wageringThreshold', 'gamesPlayed', 'bigBetsThreshold', 'depositsThreshold', 'loginStreak', 'referralsCount', 'sweepstakesEntries', 'sweepstakesWins', 'timeBasedConsistency'],
                }
            ],
            transaction
        });

        if (!userDetails) {
            throw new AppError(Errors.USER_NOT_EXISTS, 404);
        }
        const { nextVipTier } = userDetails;

        // Step 2: Find the current VIP tier and its level
        // const currentVipTier = await db.VipTier.findOne({
        //     where: { vipTierId: userDetails.vipTierId },
        //     attributes: ['vipTierId', 'level'],
        //     transaction
        // });

        // if (!currentVipTier) {
        //     throw new AppError(Errors.VIP_TIER_NOT_FOUND, 404);
        // }

        // Step 3: Find the next VIP tier based on the current tier level
        // const nextVipTier = await db.VipTier.findOne({
        //     where: { level: currentVipTier.level + 1 },
        //     // attributes: ['vipTierId', 'level'],
        //     transaction
        // });

        if (!nextVipTier) {
            throw new AppError(Errors.NEXT_LEVEL_VIP_TIER_NOT_FOUND, 404);
        }

        // Step 4: Check if a UserTierProgress exists for the next VIP tier and user
        const userTierProgress = await db.UserTierProgress.findOne({
            where: {
                userId: userId,
                vipTierId: nextVipTier.vipTierId,
                isActive: true
            },
            transaction
        });

        if (casinoGameId) {

            const transactionCount = await db.CasinoTransaction.count({
                where: {
                    userId: userId,
                    casinoGameId: casinoGameId
                },
                transaction
            });

            // Step 2: Conditional logic based on the transaction count
            if (transactionCount === 1) {
                updateFields["gamesPlayed"] = 1
            }
        }
        if (updateFields?.wageringThreshold) {
            if (nextVipTier?.bigBetAmount <= updateFields.wageringThreshold) {
                updateFields["bigBetsThreshold"] = 1
            }
        }

        if (!userTierProgress) {
            // If no progress exists, create a new entry for the user
            await db.UserTierProgress.create({
                userId: userId,
                vipTierId: nextVipTier.vipTierId,
                wageringThreshold: updateFields?.wageringThreshold || 0,
                gamesPlayed: updateFields?.gamesPlayed || 0,
                bigBetsThreshold: updateFields?.bigBetsThreshold || 0,
                depositsThreshold: updateFields?.depositsThreshold || 0,
                loginStreak: updateFields?.loginStreak || 0,
                referralsCount: updateFields?.referralsCount || 0,
                // sweepstakesEntries: updateFields?.sweepstakesEntries || 0,
                // sweepstakesWins: updateFields?.sweepstakesWins || 0,
                // timeBasedConsistency: updateFields?.timeBasedConsistency || 0
            }, transaction);
            return { success: true };
        }

        // Step 5: If progress exists, update the fields with new values
        let fieldsToUpdate = {};

        for (let field in updateFields) {
            if (userTierProgress.dataValues.hasOwnProperty(field)) {
                // Ensure the current value is defined and numeric (default to 0 if undefined)
                const currentValue = userTierProgress[field] || 0;

                // Increment the existing value with the value from updateFields
                fieldsToUpdate[field] = currentValue + updateFields[field];
            }
        }

        // If no matching fields to update, return a success with no changes
        if (Object.keys(fieldsToUpdate).length === 0) {
            return { success: true };
        }

        // Step 6: Save the updated progress back to the database

        await db.UserTierProgress.update(fieldsToUpdate, {
            where: {
                userId: userId, // Target the specific user
                vipTierId: userTierProgress.vipTierId // Ensure it's for the correct VIP tier
            },
            transaction // Include the transaction here if using one
        });


        // Step 7: Check if all conditions for the next VIP tier are met
        let allConditionsMet = true;
        // const fieldsToCheck = [
        //     'wageringThreshold', 'gamesPlayed', 'bigBetsThreshold', 'depositsThreshold',
        //     'loginStreak', 'referralsCount', 'sweepstakesEntries', 'sweepstakesWins', 'timeBasedConsistency'
        // ];
        const fieldsToCheck = [
            'wageringThreshold', 'gamesPlayed', 'bigBetsThreshold', 'depositsThreshold',
            'loginStreak', 'referralsCount'
        ];

        for (let field of fieldsToCheck) {

            const currentUserValue = userTierProgress[field] || 0;
            const updatedUserValue = fieldsToUpdate[field] !== undefined ? fieldsToUpdate[field] : currentUserValue;
            const requiredValue = nextVipTier[field];
            if (updatedUserValue < requiredValue) {
                allConditionsMet = false;
                break;
            }

            // time base consistancy 
            if (nextVipTier.timeBasedConsistency) {
                // Calculate the number of days the user has been in the current VIP tier
                const createdAt = userTierProgress.createdAt;
                const daysInCurrentTier = dayjs().diff(dayjs(createdAt), 'day'); // Calculate difference in days

                // Check if the user has been in the tier long enough
                if (daysInCurrentTier > nextVipTier.timeBasedConsistency) {
                    // also here we have to add function which drecreases user cureent tier to old tier
                    allConditionsMet = false; // User hasn't been in the tier for the required days
                    break;
                }
            }


        }

        if (allConditionsMet) {
            const nextUpgradedVipTier = await db.VipTier.findOne({
                where: { level: nextVipTier.level + 1 },
                attributes: ['vipTierId', 'level'],
                transaction
            });
            const updateUserTierPromise = db.UserDetails.update(
                { vipTierId: nextVipTier.vipTierId, nextVipTierId: nextUpgradedVipTier.vipTierId },
                { where: { userId } },
                transaction
            );
            const deactivateCurrentTierProgressPromise = db.UserTierProgress.update({ isActive: false }, {
                where: {
                    userId: userId, // Target the specific user
                    vipTierId: userTierProgress.vipTierId // Ensure it's for the correct VIP tier
                },
                transaction // Include the transaction here if using one
            });
            await Promise.all([updateUserTierPromise, deactivateCurrentTierProgressPromise]);
        }

        return { success: true };
    }
}