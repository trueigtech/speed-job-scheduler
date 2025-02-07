import db from '@src/db/models';
import ajv from '@src/libs/ajv';
import { dayjs } from '@src/libs/dayjs';
import { BaseHandler } from '@src/libs/logicBase';
import { BONUS_TYPE, USER_BONUS_STATUS_VALUES } from '@src/utils/constants/bonus.constants';

const constraints = ajv.compile({
  type: 'object',
  properties: {
    user: { type: 'object' },
    transaction: { type: 'object' },
  },
  required: ['user', 'transaction'],
});

export class ReferralBonusHandler extends BaseHandler {
  get constraints() {
    return constraints;
  }

  async run() {
    const { user, transaction, gcBonus = 50, scBonus = 100 } = this.args;

    const referrerId = user.refParentId;

    if (!referrerId) {
      console.log('No referrer ID found for user:', user.userId);
      return { success: false, message: 'Referred user has no referrer' };
    }

    const referrer = await db.User.findOne({
      where: { userId: referrerId },
      attributes: ['userId', 'username'],
    });

    if (!referrer) {
      console.log('Referrer user not found:', referrerId);
      return { success: false, message: 'Referrer not found' };
    }

    // Creating a bonus entry
    const bonus = await db.Bonus.create({
      bonusType: BONUS_TYPE.JOINING,
      promotionTitle: 'Referral Bonus',
      gcAmount: gcBonus,
      scAmount: scBonus,
      description: `Referral bonus for referring user ${user.userId}`,
      termsConditions: 'Referral bonus terms apply.',
    });

    // Step 3: Create a user-specific bonus entry
    const userBonus = await db.UserBonus.create({
      userId: referrer.userId,
      bonusId: bonus.id,
      gcAmount: bonus.gcAmount,
      scAmount: bonus.scAmount,
      wagerRequirement: bonus.gcAmount * (bonus.wagerMultiplier || 1),
      remainingWagerRequirement: bonus.gcAmount * (bonus.wagerMultiplier || 1),
      bonusStatus: USER_BONUS_STATUS_VALUES.ACTIVE,
      awardedAt: dayjs(),
      expiryDate: dayjs().add(30, 'day'), // Example expiry in 30 days
    });

    // Updating the referrer’s wallet
    const wallets = await db.Wallet.findAll({
      where: { userId: referrer.userId },
      include: {
        model: db.Currency,
        where: { code: ['GC', 'BSC'] },
        attributes: ['code', 'name'],
        required: true,
      },
      transaction,
    });

    console.log("============WALLETS", wallets);

    if (wallets && wallets.length > 0) {

      wallets.forEach( async (wallet) => {
        const currentBalance = parseFloat(wallet.balance); // DECIMAL to number

        if(wallet.currencyCode == 'GC'){
          const gcAmount = parseFloat(bonus.gcAmount); // DOUBLE to number
          
          // addition and round to 2 decimal places
          wallet.balance = parseFloat((currentBalance + gcAmount).toFixed(2));
        } else if(wallet.currencyCode == 'BSC') {
          const scAmount = parseFloat(bonus.scAmount); // DOUBLE to number
          
          // addition and round to 2 decimal places
          wallet.balance = parseFloat((currentBalance + scAmount).toFixed(2));
        }
        
        await wallet.save({ transaction });
        console.log('Wallet updated for referrer:', referrer.userId);
      })
    } else {
      console.log('No Wallet found for referrer:', referrer.userId);
    }

    return { success: true, bonus, userBonus };
  }
}
