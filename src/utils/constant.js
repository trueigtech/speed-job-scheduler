
export const RESPONSIBLE_GAMING_ENDPOINTS = ['user/daily-limit', 'user/loss-limit', 'user/deposit-limit', 'user/disable-until', 'user/session-time']

export const INTERNAL_USER_TAG = 'Internal'

export const ROLE = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  USER: 'user'
  // AFFILIATE: 'affiliate',
  // MERCHANT: 'merchant'
}

export const ROLE_ID = {
  SUPERADMIN: 1,
  ADMIN: 2,
  SUPPORT: 3,
  MANAGER: 3,
}

export const BREAK_TYPE = {
  TAKE_A_BREAK: 'TAKE_A_BREAK',
  SELF_EXCLUSION: 'SELF_EXCLUSION'
}

export const SELF_EXCLUSION_TYPE = {
  CURRENT: 'current',
  ALL: 'all'
}

export const STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
  CANCELLED: 3,
  REREQUESTED: 4
}

export const STATUS_VALUE = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  REQUESTED: 'REQUESTED',
  RE_REQUESTED: 'RE-REQUESTED'
}

export const JWT_TOKEN_TYPES = {
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgot_password'
}
export const TRANSACTION_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  CANCELLED: 2,
  FAILED: 3,
  ROLLBACK: 4,
  APPROVED: 5,
  REJECTED: 6,
  REQUESTED: 7
}

export const TRANSACTION_TYPE = {
  PURCHASE: 'Purchase',
  REDEEM: 'Redeem',
  CASINOBET: 'CasinoBet',
  REFUND: 'CasinoRefund',
  WIN: 'CasinoWin',
  BONUS_CASHED: 'BonusCasino',
  BONUS_DEPOSIT: 'BonusDeposit',
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  BONUS: 'bonus',
  BONUS_REFERRAL: 'BonusReferral',
  BONUS_TO_CASH: 'BonusToCash',
  FORFEIT: 'BonusForfeit',
  ADD_BALANCE: 'AddMoney',
  DEBIT: 'debit',
  CREDIT: 'credit',
  BET: 'bet',
  WIN: 'win',
  REFUND: 'refund',
  ROLLBACK: 'rollback',
  BONUSWIN: 'bonuswin',
  JACKPOT: 'jackpotwin',
  PROMOWIN: 'promowin'
}

export const PAYMENT_PROVIDER = {
  LIMINAL: 'Liminal',
  NOWPAYMENT: 'NowPayment',
  OFFLINE: 'Offline',
  CENTRY_OS: 'CentryOS'
}

export const GAME_CATEGORY = {
  TABLE_GAME: 'table',
  CASINO_GAME: 'casino'
}

export const RESTRICTED_TYPE = {
  PROVIDERS: 'PROVIDERS',
  GAMES: 'GAMES'
}

export const SUBJECT_TYPE = {
  ACTIVE_USER: 'userActivate',
  IN_ACTIVE_USER: 'userDeactivate',
  EMAIL_VERIFICATION: 'verification',
  RESET_PASSWORD: 'reset',
  KYC_REJECTED: 'kycRejected',
  KYC_VERIFIED: 'kycVerified',
  KYC_REQUESTED: 'kycRequested',
  // KYC_REMINDER: 'KYC Reminder',
  // KYC_RECEIVED: 'KYC Received',
  WITHDRAW_REQUEST_RECEIVED: 'withdraw_request_received',
  WITHDRAW_APPROVED: 'withdraw_request_approved',
  WITHDRAW_PROCESSED: 'withdraw_request_processed',
  DEPOSIT_SUCCESS: 'deposit_success',
  DEPOSIT_FAILED: 'deposit_failed',
  // REGISTRATION_WELCOME: 'Registration Welcome',
  // GAMBLING_STATUS_REGISTRATION: 'Gambling Status Registration',
  UPDATE_PASSWORD: 'passwordUpdated',
  JOINING_BONUS: 'joiningBonus'
}

export const EMAIL_SUBJECTS = {
  EN: {
    verification: 'Let\'s Get You Started: Please Verify Your Account',
    userActivate: 'Your Account is verified welcome to Our World',
    userDeactivate: 'Your Account is Deactivated',
    kycRejected: 'Your KYC Didn\'t Pass! We Need Your Quick Action',
    kycVerified: 'Great News! Your KYC Approval is Here',
    kycRequested: 'Just One More Step: Documents Requested for KYC Completion',
    reset: 'Time for a Fresh Start: Reset Your Password Now',
    deposit_success: 'Success! Your Deposit Has Arrived',
    deposit_failed: 'Oops! Your Deposit Failed - Let\'s Sort It Out',
    withdraw_request_received: 'We\'ve Got Your Withdrawal Request: What\'s Next?',
    withdraw_request_approved: 'Good News! Your Withdrawal Request is Approved',
    withdraw_request_processed: 'It\'s on Its Way: Your Withdrawal Request is Now Processed',
    passwordUpdated: 'Congrats! Your Password Has Been Updated Successfully',
    joiningBonus: 'Congrats! Your Password Has Been Updated Successfully'
  },
  DE: {
    verification: 'Lassen Sie uns anfangen: Bitte überprüfen Sie Ihr Konto',
    userActivate: 'Ihr Konto ist verifiziert, willkommen in unserer Welt',
    userDeactivate: 'Ihr Konto ist deaktiviert',
    kycRejected: 'Ihre KYC ist nicht durchgekommen! Wir brauchen Ihre schnelle Aktion',
    kycVerified: 'Tolle Neuigkeiten! Ihre KYC-Genehmigung ist hier',
    kycRequested: 'Nur noch ein Schritt: Dokumente für die KYC-Vollendung angefordert',
    reset: 'Zeit für einen Neuanfang: Setzen Sie Ihr Passwort jetzt zurück',
    deposit_success: 'Erfolg! Ihre Einzahlung ist eingetroffen',
    deposit_failed: 'Hoppla! Ihre Einzahlung ist fehlgeschlagen - Lassen Sie uns das klären',
    withdraw_request_received: 'Wir haben Ihre Auszahlungsanfrage erhalten: Was kommt als Nächstes?',
    withdraw_request_approved: 'Gute Nachrichten! Ihre Auszahlungsanfrage wurde genehmigt',
    withdraw_request_processed: 'Es ist auf dem Weg: Ihre Auszahlungsanfrage wird jetzt bearbeitet',
    passwordUpdated: 'Herzlichen Glückwunsch! Ihr Passwort wurde erfolgreich aktualisiert',
    joiningBonus: 'Congrats! Your Password Has Been Updated Successfully'
  },
  FR: {
    verification: 'Commençons: Veuillez vérifier votre compte',
    userActivate: 'Votre compte est vérifié, bienvenue dans notre monde',
    userDeactivate: 'Votre compte est désactivé',
    kycRejected: 'Votre KYC n\'a pas réussi! Nous avons besoin de votre action rapide',
    kycVerified: 'Bonne nouvelle! Votre approbation KYC est ici',
    kycRequested: 'Juste une étape de plus: documents demandés pour l\'achèvement du KYC',
    reset: 'Temps pour un nouveau départ: réinitialisez votre mot de passe maintenant',
    deposit_success: 'Succès! Votre dépôt est arrivé',
    deposit_failed: 'Oups! Votre dépôt a échoué - Réglons cela',
    withdraw_request_received: 'Nous avons reçu votre demande de retrait: Quelle est la prochaine étape?',
    withdraw_request_approved: 'Bonne nouvelle! Votre demande de retrait est approuvée',
    withdraw_request_processed: 'C\'est en route: Votre demande de retrait est maintenant traitée',
    passwordUpdated: 'Félicitations! Votre mot de passe a été mis à jour avec succès',
    joiningBonus: 'Congrats! Your Password Has Been Updated Successfully'
  },
  FI: {
    verification: 'Aloitetaan: Vahvista tilisi',
    userActivate: 'Tilisi on vahvistettu, tervetuloa maailmaamme',
    userDeactivate: 'Tilisi on poistettu käytöstä',
    kycRejected: 'KYC:si ei mennyt läpi! Tarvitsemme nopeaa toimintaa',
    kycVerified: 'Hyviä uutisia! KYC-hyväksyntäsi on tässä',
    kycRequested: 'Vielä yksi askel: asiakirjoja pyydetään KYC:n valmiiksi saattamiseksi',
    reset: 'Aika uudelle alulle: Nollaa salasanasi nyt',
    deposit_success: 'Onnistui! Talletuksesi on saapunut',
    deposit_failed: 'Hups! Talletuksesi epäonnistui - Selvitetään se',
    withdraw_request_received: 'Olemme saaneet nostopyyntösi: Mitä seuraavaksi?',
    withdraw_request_approved: 'Hyviä uutisia! Nostopyyntösi on hyväksytty',
    withdraw_request_processed: 'Se on matkalla: Nostopyyntösi on nyt käsitelty',
    passwordUpdated: 'Onnittelut! Salasanasi on päivitetty onnistuneesti',
    joiningBonus: 'Congrats! Your Password Has Been Updated Successfully'
  },
  NO: {
    verification: 'La oss komme i gang: Vennligst bekreft kontoen din',
    userActivate: 'Kontoen din er bekreftet, velkommen til vår verden',
    userDeactivate: 'Kontoen din er deaktivert',
    kycRejected: 'Din KYC gikk ikke gjennom! Vi trenger din raske handling',
    kycVerified: 'Gode nyheter! Din KYC-godkjenning er her',
    kycRequested: 'Bare ett skritt til: Dokumenter bedt om for KYC-ferdigstillelse',
    reset: 'Tid for en frisk start: Tilbakestill passordet ditt nå',
    deposit_success: 'Suksess! Innskuddet ditt har kommet',
    deposit_failed: 'Oops! Innskuddet ditt mislyktes - La oss ordne det',
    withdraw_request_received: 'Vi har mottatt uttaksforespørselen din: Hva skjer videre?',
    withdraw_request_approved: 'Gode nyheter! Uttaksforespørselen din er godkjent',
    withdraw_request_processed: 'Det er på vei: Uttaksforespørselen din behandles nå',
    passwordUpdated: 'Gratulerer! Passordet ditt er oppdatert',
    joiningBonus: 'Congrats! Your Password Has Been Updated Successfully'
  }
}

export const ACTION = {
  WIN: 'win',
  BET: 'bet',
  ROLLBACK: 'rollback',
  ROLLBACKBEFOREBETWIN: 'prerollback',
  FREESPINS: 'freespins',
  INTERNAL: {
    bet: 'betInternal',
    win: 'winInternal'
  }
}

export const ACCOUNT_TYPE = {
  REAL: 'REAL',
  INTERNAL: 'INTERNAL'
}

export const LIMIT_TIME_PERIOD = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
}

export const EMAIL_TEMPLATE_PRIMARY_STATUS = {
  PRIMARY: 1,
  DISABLE: 0,
  alias: {
    0: 'disable',
    1: 'primary'
  }
}

export const EMAIL_TEMPLATE_TYPES = {
  ACTIVE_USER: 'Active User',
  IN_ACTIVE_USER: 'In-Active User',
  EMAIL_VERIFICATION: 'Email Verification',
  RESET_PASSWORD: 'Reset Password',
  KYC_REJECTED: 'KYC Rejected',
  KYC_VERIFIED: 'KYC Verified',
  KYC_REQUESTED: 'KYC Requested',
  // KYC_REMINDER: 'KYC Reminder',
  KYC_RECEIVED: 'KYC Received',
  // WITHDRAW_REQUEST_RECEIVED: 'Withdraw Request Received',
  // WITHDRAW_APPROVED: 'Withdraw Approved',
  WITHDRAW_PROCESSED: 'Withdraw Processed',
  DEPOSIT_SUCCESS: 'Deposit Success',
  DEPOSIT_FAILED: 'Deposit Failed',
  REGISTRATION_WELCOME: 'Registration Welcome',
  // GAMBLING_STATUS_REGISTRATION: 'Gambling Status Registration',
  UPDATE_PASSWORD: 'Password Updated',
  JOINING_BONUS: 'Joining Bonus',
  VALUE_T0_INT: {
    'Active User': 0,
    'In-Active User': 1,
    'Email Verification': 2,
    'Reset Password': 3,
    'KYC Rejected': 4,
    'KYC Verified': 5,
    'KYC Requested': 6,
    // 'KYC Reminder': 7,
    'KYC Received': 8,
    // 'Withdraw Request Received': 10,
    // 'Withdraw Approved': 11,
    'Withdraw Processed': 12,
    'Deposit Success': 13,
    'Deposit Failed': 14,
    'Registration Welcome': 15,
    // 'Gambling Status Registration': 16,
    'Password Updated': 17,
    'Joining Bonus': 18
  },
  INT_TO_VALUE: {
    0: 'Active User',
    1: 'In-Active User',
    2: 'Email Verification',
    3: 'Reset Password',
    4: 'KYC Rejected',
    5: 'KYC Verified',
    6: 'KYC Requested',
    // 7: 'KYC Reminder',
    8: 'KYC Received',
    // 10: 'Withdraw Request Received',
    // 11: 'Withdraw Approved',
    12: 'Withdraw Processed',
    13: 'Deposit Success',
    14: 'Deposit Failed',
    15: 'Registration Welcome',
    // 16: 'Gambling Status Registration',
    17: 'Password Updated',
    18: 'Joining Bonus'
  }
}

export const EMAIL_TEMPLATE_ORDER = [
  'Active User',
  'In-Active User',
  'Email Verification',
  'Reset Password',
  'KYC Rejected',
  'KYC Verified',
  'KYC Requested',
  // 'KYC Reminder',
  'KYC Received',
  // 'Withdraw Request Received',
  // 'Withdraw Approved',
  'Withdraw Processed',
  'Deposit Success',
  'Deposit Failed',
  'Registration Welcome',
  // 'Gambling Status Registration',
  'Password Updated',
  'Joining Bonus'
]

export const EMAIL_ALLOWED_KEYS = [
  'siteName',
  'siteLogo',
  'subject',
  'userName',
  'walletAmountTotal',
  'walletAmountBonus',
  'walletAmountReal',
  'siteUrl',
  'reason',
  'link',
  'withdrawAmount',
  'depositAmount',
  'transactionId',
  'playerEmail',
  'playerFullName',
  'playerFirstName',
  'playerLastName',
  'supportEmailAddress',
  'kycLabels',
  'siteLoginUrl',
  'playerCurrencySymbol',
  'sendSupportRequestRoute',
  'newPassword',
  'joiningAmount'
]

export const EMAIL_TEMPLATES_KEYS = {
  0: {
    required: ['siteName', 'siteUrl'],
    optional: ['userName', 'walletAmountTotal', 'siteLogo', 'walletAmountBonus', 'walletAmountReal']
  },
  1: {
    required: ['siteName', 'siteUrl', 'reason'],
    optional: ['userName', 'walletAmountTotal', 'siteLogo', 'walletAmountBonus', 'walletAmountReal']
  },
  2: {
    required: ['link', 'siteName'],
    optional: ['siteUrl', 'siteLogo', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'userName', 'playerEmail']
  },
  3: {
    required: ['link', 'siteName'],
    optional: ['siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol']
  },
  4: {
    required: ['reason', 'siteName'],
    optional: ['kycLabels', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  5: {
    required: ['playerFullName', 'siteName'],
    optional: ['siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  6: {
    required: ['kycLabels'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  7: {
    required: [],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  8: {
    required: [],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  10: {
    required: ['withdrawAmount', 'playerCurrencySymbol'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  11: {
    required: ['withdrawAmount', 'playerCurrencySymbol'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  12: {
    required: ['withdrawAmount', 'playerCurrencySymbol', 'transactionId'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  13: {
    required: ['transactionId', 'playerCurrencySymbol', 'depositAmount'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'sendSupportRequestRoute', 'playerCurrencySymbol']
  },
  14: {
    required: ['transactionId', 'subject', 'playerCurrencySymbol', 'depositAmount'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  15: {
    required: ['playerFullName', 'siteLoginUrl', 'userName'],
    optional: ['siteName', 'siteLogo', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'supportEmailAddress', 'siteLoginUrl', 'playerCurrencySymbol', 'sendSupportRequestRoute']
  },
  16: {
    required: ['supportEmailAddress', 'sendSupportRequestRoute'],
    optional: ['siteName', 'siteLogo', 'userName', 'walletAmountTotal', 'walletAmountBonus', 'walletAmountReal', 'siteUrl', 'playerEmail', 'playerFullName', 'playerFirstName', 'playerLastName', 'siteLoginUrl', 'playerCurrencySymbol']
  },
  17: {
    required: ['playerEmail', 'newPassword', 'siteLoginUrl'],
    optional: ['siteName', 'siteLogo', 'userName', 'siteUrl', 'playerFullName', 'playerFirstName', 'playerLastName']
  },
  18: {
    required: ['userName', 'joiningAmount', 'siteName'],
    optional: ['siteName', 'siteLogo', 'userName', 'siteUrl', 'playerFullName', 'playerFirstName', 'playerLastName']
  }
}

export const EMAIL_DYNAMIC_OPTIONS = [
  {
    key: 'siteName',
    description: 'This will be replaced by Site name'
  },
  {
    key: 'siteLogo',
    description: 'This will be replaced by Site\'s Logo URL'
  },
  {
    key: 'subject',
    description: 'If not given, default subject line will be used'
  },
  {
    key: 'userName',
    description: 'This will be replaced by User\'s unique username'
  },
  {
    key: 'walletAmountTotal',
    description: 'This will be replaced by User\'s total wallet amount'
  },
  {
    key: 'walletAmountBonus',
    description: 'This will be replaced by User\'s non-cash wallet amount'
  },
  {
    key: 'walletAmountReal',
    description: 'This will be replaced by User\'s cash wallet amount'
  },
  {
    key: 'siteUrl',
    description: 'This will be replaced by site\'s URL'
  },
  {
    key: 'reason',
    description: 'This will be replaced by valid reason for triggering email'
  },
  {
    key: 'link',
    description: 'Dynamically generated link from backend (Reset Password, Email Confirmation)'
  },
  {
    key: 'withdrawAmount',
    description: 'This will be replaced by withdraw request amount'
  },
  {
    key: 'depositAmount',
    description: 'This will be replaced by deposit amount'
  },
  {
    key: 'transactionId',
    description: 'This will be replaced by transaction Id for (Deposit / Withdraw)'
  },
  {
    key: 'playerEmail',
    description: 'This will be replaced by player\'s email address'
  },
  {
    key: 'playerFullName',
    description: 'This will be replaced by player\'s full name (first name + last name)'
  },
  {
    key: 'playerFirstName',
    description: 'This will be replaced by player\'s first name'
  },
  {
    key: 'playerLastName',
    description: 'This will be replaced by player\'s last name'
  },
  {
    key: 'supportEmailAddress',
    description: 'This will be replaced by support email address'
  },
  {
    key: 'kycLabels',
    description: 'This will be replaced by kyc label for pending, approved, rejected'
  },
  {
    key: 'siteLoginUrl',
    description: 'This will be replaced by user login route'
  },
  {
    key: 'playerCurrencySymbol',
    description: 'This will be replaced by user\'s currency symbol'
  },
  {
    key: 'sendSupportRequestRoute',
    description: 'This will be replaced by route for compose support email page.'
  },
  {
    key: 'newPassword',
    description: 'This will be replaced by updated password'
  },
  {
    key: 'currentYear',
    description: 'This will be replaced by current year (yyyy)'
  },
  {
    key: 'joiningAmount',
    description: 'This will be replaced by joining Amount in joining Bonus template.'
  }
]

export const CMS_ALLOWED_KEYS = ['siteName', 'siteLogo', 'supportEmailAddress', 'siteUrl']

export const CMS_DYNAMIC_OPTIONS = [
  {
    key: 'siteName',
    description: 'This will be replaced by Site name'
  },
  {
    key: 'siteLogo',
    description: 'This will be replaced by Site\'s Logo URL'
  },
  {
    key: 'supportEmailAddress',
    description: 'This will be replaced by support email address'
  },
  {
    key: 'siteUrl',
    description: 'This will be replaced by Site domain'
  }
]

export const MAP_AGGREGATOR = {
  softswiss: 'swissSoft',
  amantic: 'amantic'
}

export const BANNER_KEYS = ['homeBanner', 'homeBackground', 'loyaltyBanner', 'loyaltyBackground', 'promotionsBanner', 'promotionsBackground', 'casinoBanner', 'casinoBackground', 'cashbackBanner', 'cashbackBackground', 'loginBanner']

export const LANGUAGE_SUPPORT_KEYS = {
  HOME: [
    'homeBannerDesc',
    'homeBannerJoinNow',
    'homeBannerTnc',
    'loginHomeBannerBtn',
    'homeRealPlayerSec',
    'homeCurrentWinners',
    'homeTopWinners',
    'homeTopGames',
    'homeAbout',
    'homeAboutContent',
    'homeTestimonial'
  ],
  FOOTER: [
    'footerAboutSite',
    'footerRightsReserved',
    'footerCategory',
    'footerSupport',
    'footerOther',
    'footerImageOne',
    'footerImageTwo',
    'footerImageThree'
  ],
  CASINO: [
    'casinoBannerDesc',
    'casinoBannerJoinNow',
    'casinoBannerTnc',
    'casinoFavorite',
    'casinoNoFavGamesFound',
    'casinoNoGamesFound',
    'casinoGameViewAllBtn',
    'casinoSearch',
    'casinoMoreGames',
    'casinoProviders'
  ],
  HEADER: [
    'headerHome',
    'headerPromotions',
    'headerLoyalty',
    'headerSearch',
    'headerRealMoney',
    'headerCasinoBonus',
    'headerLevel',
    'headerDeposit',
    'headerAccAndInfo',
    'headerAccVerify',
    'headerBonus',
    'headerLimits',
    'headerDepositFunds',
    'headerWithdrawFunds',
    'headerTransactionHistory',
    'headerSelectYourLang',
    'headerBetHistory',
    'headerLogout',
    'headerCashback'
  ],
  LOYALTY: [
    'loyaltyBannerBtn',
    'loginLoyaltyBannerBtn',
    'loyaltyBannerHeading',
    'loyaltyBannerDesc',
    'loyaltyHeadingOne',
    'loyaltyHeadingOneDesc',
    'loyaltySubHeadOne',
    'loyaltySubHeadOneDesc',
    'loyaltySubHeadTwo',
    'loyaltySubHeadTwoDesc',
    'loyaltySubHeadThree',
    'loyaltySubHeadThreeDesc',
    'loyaltyTableHeading',
    'loyaltyTableHeaderOne',
    'loyaltyTableHeaderTwo',
    'loyaltyTableHeaderThree',
    'loyaltyTableHeaderFour',
    'loyaltyTableHeaderFive',
    'loyaltyTableHeaderSix',
    'loyaltyTableHeaderSeven',
    'loyaltyTableDesc',
    'loyaltyHeadingTwo',
    'loyaltyHeadingTwoDesc',
    'loyaltyHeadingThree',
    'loyaltyHeadingThreeDesc',
    'loyaltySubHeadFour',
    'loyaltySubHeadFourDesc',
    'loyaltySubHeadFive',
    'loyaltySubHeadFiveDesc',
    'loyaltySubHeadSix',
    'loyaltySubHeadSixDesc',
    'loyaltySubHeadSeven',
    'loyaltySubHeadSevenDesc',
    'loyaltySubHeadEight',
    'loyaltySubHeadEightDesc',
    'loyaltySubHeadNine',
    'loyaltySubHeadNineDesc',
    'loyaltySubHeadTen',
    'loyaltySubHeadTenDesc',
    'loyaltySubHeadEleven',
    'loyaltySubHeadElevenDesc',
    'loyaltyTestimonialHeadOne',
    'loyaltyTestimonialHeadTwo',
    'loyaltyTestimonialDesc',
    'loyaltyHeadingFour',
    'loyaltyPoints',
    'loyaltyCashback',
    'loyaltyLevel'
  ],
  PROMOTION: [
    'promBannerDesc',
    'promClaimNow',
    'loginPromBannerBtn',
    'promReadMore',
    'promFreespinGames',
    'promTermsAndConditions'
  ],
  LOGIN: [
    'loginKey',
    'loginToYourAccount',
    'loginUsername',
    'loginEmail',
    'loginEnter',
    'loginYour',
    'loginPassword',
    'loginForget',
    'loginDoNotHaveAccount',
    'loginSignUp',
    'accountsInfoFirstTab',
    'accountsInfoFourthTab'
  ],
  SINGUP: [
    'signupGetAnAmazing',
    'signupBannerDesc',
    'signupStartWithEmail',
    'signupLoginDetails',
    'signupEmailAddress',
    'signupUserName',
    'signupConfirm',
    'signupPrivacyPolicy',
    'signupTermAndConditions',
    'signupSms',
    'signupNewsLetter',
    'signupNextStep',
    'signupHaveAccount',
    'signupSignIn',
    'signupPersonalDetails',
    'signupFirstName',
    'signupDob',
    'signupAddress',
    'signupPhoneNo',
    'signupCity',
    'signupPostcode',
    'signupCounty',
    'signupCurrency',
    'signupGender',
    'signupMan',
    'signupWomen',
    'signupOther',
    'signupBack',
    'signupCreateAnAccount',
    'signupLastName',
    'signupChange'
  ],
  CASHBACK: [
    'cashbackBannerBtn',
    'loginCashbackBannerBtn',
    'cashbackBannerHeading',
    'cashbackBannerDesc',
    'cashbackHeadingOne',
    'cashbackHeadingOneDesc',
    'cashbackHeadingTwo',
    'cashbackHeadingTwoDesc',
    'cashbackHeadingThree',
    'cashbackHeadingThreeDesc',
    'cashbackHeadingFour',
    'cashbackHeadingFourDesc',
    'cashbackTestimonialHeading',
    'cashbackTestimonialDesc',
    'cashbackTableDesc',
    'cashbackTableHeading',
    'cashbackFooterDesc',
    'cashbackTableHeaderOne',
    'cashbackTableHeaderTwo',
    'cashbackTableHeaderThree',
    'cashbackTableHeaderFour'
  ],
  OTHER: [
    'sidebarCmsOne',
    'sidebarCmsTwo',
    'completePayment',
    'kycProtocolDetails',
    'bonusForfeited',
    'bonusZeroedOut',
    'bonusExpired',
    'bonusBalanceDone',
    'completedWagering'
  ]
}

export const SOCKET_NAMESPACES = {
  WALLET: '/wallet',
  LEADER_BOARD: '/leader-board',
  ACCOUNT_CAPTURE: '/accountCapture'
}

export const SOCKET_EMITTERS = {
  USER_WALLET_BALANCE: 'USER_WALLET_BALANCE',
  LEADER_BOARD: 'LEADER_BOARD',
  ACCOUNT_CAPTURE: 'ACCOUNT_CAPTURE',
  USER_TRANSACTION: 'USER_USER_TRANSACTION'
}

export const SOCKET_LISTENERS = {
  USER_WALLET_BALANCE: SOCKET_NAMESPACES.WALLET + '/balance'

}

export const SOCKET_ROOMS = {
  LEADER_BOARD: 'LEADER_BOARD',
  USER_WALLET: 'USER_WALLET',
  ACCOUNT_CAPTURE: 'ACCOUNT_CAPTURE'
}

export const PROMOTIONS_TYPE = {
  CASINO_PROMOTIONS: 1,
  SPONSORSHIPS: 2
}

export const GLOBAL_SETTING = {
  FAUCET_SETTING: 'FAUCET_SETTING',
  REDEEM_SETTING: 'REDEEM_SETTING'
}

export const VIP_TIER = {
  DEFAULT_TIER: 0
}

export const DOCUMENT_TYPES = {
  VERIFF: 'veriff',
  OTHER: 'other'
}

// Document constants start
export const DOCUMENT_STATUS_TYPES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REQUESTED: 'requested'
}

export const REPORT_TIME_PERIOD_FILTER = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last7days',
  LAST_30_DAYS: 'last30days',
  LAST_90_DAYS: 'last90days',
  MONTH_TO_DATE: 'monthtodate',
  WEEK_TO_DATE: 'weektodate',
  YEAR_TO_DATE: 'yeartodate',
  PREVIOUS_MONTH: 'previousmonth',
  PREVIOUS_YEAR: 'previousyear'
}
