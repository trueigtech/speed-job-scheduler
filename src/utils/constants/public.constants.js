export const BANNER_TYPE = {
  HOME: 'home',
  CASINO: 'casino',
  OTHER: 'other'
}

export const COINS = {
  GOLD_COIN: 'GC',
  SWEEP_COIN: {
    BONUS_SWEEP_COIN: 'BSC',
    PURCHASE_SWEEP_COIN: 'PSC',
    REDEEMABLE_SWEEP_COIN: 'RSC'
  }
}

export const TRANSACTION_PURPOSE = {
  // General transactions
  PURCHASE: 'purchase',
  REDEEM: 'redeem',

  // Bonus transactions
  BONUS_CASH: 'bonus_cash',
  BONUS_DEPOSIT: 'bonus_deposit',
  BONUS_REFERRAL: 'bonus_referral',
  BONUS_TO_CASH: 'bonus_to_cash',
  BONUS_FORFEIT: 'bonus_forfeit',
  BONUS_WIN: 'bonus_win',
  BONUS_DROP: 'bonus_drop',
  BONUS_RACKBACK: 'bonus_rackback',

  // Faucet transactions
  FAUCET_AWAIL: 'faucet_awail',

  // Affiliate Commission
  AFFILIATE_COMMISSION: 'affiliate_commission',

  // Spin Wheel transaction
  WHEEL_REWARD: "wheel_reward",

  // Chatrain transaction
  EMIT: 'emit_chatrain',
  CHATRAIN: 'chatrain',
  CLAIM: 'claim_chatrain',

  //Tip transaction
  SEND_TIP: 'send_tip',
  TIP: 'tip',
  RECEIVE_TIP: 'receive_tip'
}

// Casino transactions
export const CASINO_TRANSACTION_PURPOSE = {
  CASINO_BET: 'casino_bet',
  CASINO_REFUND: 'casino_refund',
  CASINO_WIN: 'casino_win',
  JACKPOT_WIN: 'jackpot_win',
  PROMO_WIN: 'promo_win',
  BONUS_DROP: 'bonus_drop',
  GAME_ROLLBACK: 'game_rollback',
  CASINO_WIN_ROLLBACK: 'casino_win_rollback',
  CASINO_BET_ROLLBACK: 'casino_bet_rollback'
}

export const LEDGER_TYPES = {
  DEBIT: 'Debit',
  CREDIT: 'Credit'
}

export const LEDGER_TRANSACTION_TYPES = {
  CASINO: 'casino',
  BANKING: 'banking',
  WITHDRAW: 'withdraw',
  BONUS: 'bonus',
  CHATRAIN: 'chatrain',
  TIP: 'tip',
  COMMISSION: 'commission'
}
export const VIP_TIER_NAMES = {
  BRONZE: 'Bronze',
  SILVER: 'silver',
  GOLD: 'gold'
}

export const LEDGER_DIRECTIONS = {
  [TRANSACTION_PURPOSE.PURCHASE]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.REDEEM]: LEDGER_TYPES.DEBIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_BET]: LEDGER_TYPES.DEBIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_WIN]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_REFUND]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.BONUS_DROP]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.FAUCET_AWAIL]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.WHEEL_REWARD]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_BET_ROLLBACK]: LEDGER_TYPES.CREDIT,
  [CASINO_TRANSACTION_PURPOSE.CASINO_WIN_ROLLBACK]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.EMIT]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.CLAIM]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.CHATRAIN]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.SEND_TIP]: LEDGER_TYPES.DEBIT,
  [TRANSACTION_PURPOSE.RECEIVE_TIP]: LEDGER_TYPES.CREDIT,
  [TRANSACTION_PURPOSE.AFFILIATE_COMMISSION]: LEDGER_TYPES.CREDIT,
}

export const WITHDRAWAL_STATUS = {
  PENDING: 'Pending',
  SUCCESS: 'Success',
  CANCELLED: 'Cancelled'
}

export const GRADUAL_LOSS_PERIOD_UNITS = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years'
}

export const TICKET_STATUSES = {
  OPEN: 'open',
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
}
