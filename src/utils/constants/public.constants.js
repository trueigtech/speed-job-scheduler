export const COINS = {
  GOLD_COIN: 'GC',
  SWEEP_COIN: {
    BONUS_SWEEP_COIN: 'BSC',
    PURCHASE_SWEEP_COIN: 'PSC',
    REDEEMABLE_SWEEP_COIN: 'RSC',
  }
}

export const BANNER_TYPE = {
  HOME: 'home',
  CASINO: 'casino',
  OTHER: 'other'
}

const ASSETS = 'sweeps/assets'

export const S3_FILE_PREFIX = {
  bonus: ASSETS + '/bnonus',
  packages: ASSETS + '/sweeps/packages',
  casino_game: ASSETS + '/casino/games',
  casino_provider: ASSETS + '/casino/providers',
  casino_category: ASSETS + '/casino/categories',
  promotions: ASSETS + '/promotions',
  siteLogo: ASSETS + '/site_information/logo',
  banner: ASSETS + '/site_information/banner',
  imageGallery: ASSETS + '/gallery',
  vipTier : ASSETS + '/vip_tier/icon'
}

export const LEDGER_PURPOSE = {
  // General transactions
  PURCHASE: 'purchase',
  REDEEM: 'redeem',
  REDEEM_REFUND: 'redeem_refund',

  // Bonus transactions
  BONUS_CASH: 'bonus_cash',
  BONUS_PURCHASE: 'bonus_purchase',
  BONUS_REFERRAL: 'bonus_referral',
  BONUS_TO_CASH: 'bonus_to_cash',
  BONUS_FORFEIT: 'bonus_forfeit',
  BONUS_WIN: 'bonus_win',
  BONUS_RACKBACK: 'bonus_rackback',


  // Faucet transactions
  FAUCET_AWAIL: 'faucet_awail',

  // Spin Wheel transaction
  WHEEL_REWARD: "wheel_reward",

  // Casino transactions
  CASINO_BET: 'casino_bet',
  CASINO_REFUND: 'casino_refund',
  CASINO_WIN: 'casino_win',
  JACKPOT_WIN: 'jackpot_win',
  PROMO_WIN: 'promo_win',
  GAME_ROLLBACK: 'game_rollback',
  CASINO_WIN_ROLLBACK: 'casino_win_rollback',
  CASINO_BET_ROLLBACK: 'casino_bet_rollback',

  // agent transaction
  AGENT_COMMISSION: 'agent_commission'
}

export const LEDGER_TYPES = {
  DEBIT: 'Debit',
  CREDIT: 'Credit'
}

export const LEDGER_DIRECTIONS = {
  [LEDGER_PURPOSE.PURCHASE]: LEDGER_TYPES.CREDIT,
  [LEDGER_PURPOSE.REDEEM]: LEDGER_TYPES.DEBIT,
  [LEDGER_PURPOSE.CASINO_BET]: LEDGER_TYPES.DEBIT,
  [LEDGER_PURPOSE.CASINO_WIN]: LEDGER_TYPES.CREDIT,
  [LEDGER_PURPOSE.CASINO_WIN_ROLLBACK]: LEDGER_TYPES.DEBIT,
  [LEDGER_PURPOSE.CASINO_BET_ROLLBACK]: LEDGER_TYPES.CREDIT,
  [LEDGER_PURPOSE.CASINO_REFUND]: LEDGER_TYPES.CREDIT,
  [LEDGER_PURPOSE.FAUCET_AWAIL]: LEDGER_TYPES.CREDIT,
  [LEDGER_PURPOSE.WHEEL_REWARD]: LEDGER_TYPES.CREDIT,

}




export const LEDGER_TRANSACTION_TYPES = {
  CASINO: 'casino',
  BANKING: 'banking',
  WITHDRAW: 'withdraw'
}



export const WITHDRAWAL_STATUS = {
  PENDING: 'Pending',
  SUCCESS: 'Success',
  CANCELLED: 'Cancelled',
}

export const SC_GC_REQUIRED_PLAY_UNITS = {
  DAYS : 'days',
  MONTHS : 'months',
  YEARS : 'years'
}

export const GRADUAL_LOSS_PERIOD_UNITS = {
  DAYS : 'days',
  MONTHS : 'months',
  YEARS : 'years'
}

export const WALLET_OWNER_TYPES = {
  USER: 'user',
  ADMIN: 'admin'
}

export const WALLET_DIRECTIONS = {
  SEND: 'send',
  REDEEM: 'redeem'
}

export const TICKET_STATUSES = {
  OPEN : 'open',
  ACTIVE : 'active',
  RESOLVED : 'resolved',
  CLOSED : 'closed'
}
