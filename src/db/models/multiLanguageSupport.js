'use strict'

module.exports = (sequelize, DataTypes) => {
  const MultiLanguageSupport = sequelize.define('MultiLanguageSupport', {
    multiLanguageSupportId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    casinoBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoBannerJoinNow: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoBannerTnc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoFavorite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoNoFavGamesFound: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoNoGamesFound: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoGameViewAllBtn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoSearch: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoMoreGames: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    casinoProviders: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeAbout: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerAboutSite: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerRightsReserved: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerCategory: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerSupport: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerOther: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    footerImageOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    footerImageTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    footerImageThree: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    promBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    promClaimNow: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    promReadMore: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    promFreespinGames: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    promTermsAndConditions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeBannerJoinNow: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeBannerTnc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeRealPlayerSec: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeCurrentWinners: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeTopWinners: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeTopGames: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeAboutContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    homeTestimonial: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerHome: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerPromotions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerLoyalty: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerSearch: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerRealMoney: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerCasinoBonus: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerLevel: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerDeposit: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerAccAndInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerAccVerify: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerBonus: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerLimits: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerDepositFunds: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerWithdrawFunds: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerTransactionHistory: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerBetHistory: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerLogout: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerSelectYourLang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginKey: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginToYourAccount: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginUsername: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginEmail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginEnter: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginYour: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginPassword: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginForget: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginDoNotHaveAccount: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    loginSignUp: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupGetAnAmazing: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupStartWithEmail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupLoginDetails: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupEmailAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupUserName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupNewsLetter: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupSms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupPrivacyPolicy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupTermAndConditions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupConfirm: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupNextStep: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupHaveAccount: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupSignIn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupPersonalDetails: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupFirstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupDob: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupPhoneNo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupCity: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupPostcode: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupCounty: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupCurrency: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupGender: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupMan: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupWomen: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupOther: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupBack: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupCreateAnAccount: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    signupLastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackBannerHeading: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingOne: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingOneDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingTwo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingTwoDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingThree: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingThreeDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingFour: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackHeadingFourDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTestimonialHeading: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTestimonialDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableHeading: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackFooterDesc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    headerCashback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableHeaderOne: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableHeaderTwo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableHeaderThree: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cashbackTableHeaderFour: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyBannerHeading: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyBannerDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingOneDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadOneDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadTwoDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadThree: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadThreeDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeading: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderThree: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderFour: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderFive: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderSix: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableHeaderSeven: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTableDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingTwoDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingThree: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingThreeDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadFour: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadFourDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadFive: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadFiveDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadSix: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadSixDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadSeven: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadSevenDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadEight: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadEightDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadNine: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadNineDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadTen: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadTenDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadEleven: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltySubHeadElevenDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTestimonialHeadOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTestimonialHeadTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyTestimonialDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyHeadingFour: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyPoints: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyLevel: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loyaltyCashback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sidebarCmsOne: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sidebarCmsTwo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completePayment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kycProtocolDetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bonusForfeited: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bonusZeroedOut: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bonusExpired: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bonusBalanceDone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completedWagering: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginHomeBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginPromBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginLoyaltyBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    loginCashbackBannerBtn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accountsInfoFirstTab: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accountsInfoFourthTab: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'multi_language_support',
    schema: 'public',
    timestamps: true,
    underscored: true
  })

  return MultiLanguageSupport
}
