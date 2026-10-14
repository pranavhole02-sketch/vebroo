/**
 * Complete list of API endpoints recovered from the app bundle.
 */
export const Endpoints = {
  // Auth & User Management
  auth: {
    login: '/users/login',
    phone: '/users/phone',
    google: '/users/google',
    facebook: '/users/facebook',
    createUserWithZego: '/users/create-with-zego',
    linkPhone: '/users/me/link-phone',
    linkGoogle: '/users/me/link-google',
    linkFacebook: '/users/me/link-facebook',
    unlinkGoogle: '/users/me/unlink-google',
    unlinkFacebook: '/users/me/unlink-facebook',
    banStatus: '/users/me/ban-status',
    userStates: '/user-states',
  },

  // Users & Profiles
  users: {
    base: '/users',
    profile: '/profiles',
    profileByNumericId: '/profiles/by-numeric-id',
    setShortId: '/profiles/set-short-id',
    changeCountry: '/users/me/change-country',
    follow: '/users/follow',
    block: '/users/block',
    visits: '/users/visits',
    profileVisitors: '/profilevisitors',
    dailyRewards: '/daily-rewards',
    claimDailyReward: '/daily-rewards/claim',
    dailyRewardsUi: '/users/me/daily-rewards-ui',
    roomEffectSettings: '/users/me/room-effect-settings',
    myItems: '/myitems',
    allocateItemToProfile: '/myitems/allocate-to-profile',
    deallocateItemFromProfile: '/myitems/deallocate-from-profile',
    levels: '/levels',
    medals: '/medals',
    medalProgress: '/medal-progress',
    cpLevels: '/cp/levels',
    svipLevels: '/sviplevels',
  },

  // Live Streaming & Rooms
  rooms: {
    base: '/rooms',
    recent: '/resents',
    myFollows: '/room/my-follows',
    follow: '/room/addfollow',
    unfollow: '/room/unfollow',
    roomLevels: '/room-levels',
    roomProgress: '/room-progress',
    roomProgressSummary: '/room-progress/summary',
    addPartner: '/room-progress/add-partner',
    setAdmin: '/set-admin',
    purchaseItem: '/purchase-item',
  },

  // Gifting & Lucky Bags
  gifts: {
    send: '/gift/send-to-myitem',
    sendFromBag: '/gift/send-from-bag',
    bag: '/gift/bag',
    events: '/giftevents',
    eventProgressBatch: '/gift/event-progress/batch',
    stageDeclaration: '/gift-events/stage-declaration',
    distributeFromProgress: '/gift-events/distribute-from-progress',
    topSenders: '/gift/top-senders',
    topReceivers: '/gift/top-receivers',
    topRooms: '/gift/top-rooms',
    topSendersByLevel: '/gift/top-senders-by-level',
    luckyBagCreate: '/lucky-bag/create',
    luckyBagActive: '/lucky-bag/active',
    luckyBagClaim: '/lucky-bag/claim',
    luckyBagExpire: '/lucky-bag/expire',
    luckyBagHistoryReceived: '/lucky-bag/history/received',
    luckyBagRoomHistory: '/lucky-bag/history',
    customizedMine: '/customized-gifts/mine',
    customizedPresign: '/customized-gifts/presign',
    customizedSubmit: '/customized-gifts/submit',
    customizedCommitMedia: '/customized-gifts/commit-media',
  },

  // Group PK & Battles
  groupPk: {
    config: '/group-pk/config',
    rankingsGifters: '/group-pk/rankings/gifters',
    rankingsReceivers: '/group-pk/rankings/receivers',
    rankingsRooms: '/group-pk/rankings/rooms',
    pkKingConfig: '/pk-king/config',
    pkKingRankings: '/pk-king/rankings',
  },

  // Wallet, Recharge & Payments
  wallet: {
    razorpayPaymentRecords: '/razorpay/payment-records',
    razorpayPaymentRecordStatus: '/razorpay/payment-record/status',
    rechargeOffers: '/recharge-offers',
    rechargeOffersActive: '/recharge-offers/active',
    rechargeEventRanking: '/recharge-event/ranking',
    rechargeDiamonds: '/users/me/recharge-diamonds',
    convertCoinsToDiamonds: '/users/me/convert-coins-to-diamonds',
    googlePlayVerifyPurchase: '/google-play/verify-purchase',
    freezeStatus: '/users/me/wallet-freeze-status',
    history: '/sellers/transaction-history',
    shopItems: '/item-list',
  },

  // Chat & Social Feeds
  chat: {
    activitiesList: '/chat-activities/list',
    directConversations: '/direct-chat/conversations',
    messages: '/chat/messages',
    moments: '/moments',
    momentComments: '/momentcomments',
    invitations: '/invitations',
  },

  // Weekly Star & Events
  events: {
    weeklyStar: '/weekly-star',
    weeklyStarCombined: '/weekly-star/combined',
    weeklyStarHallOfFame: '/weekly-star/hall-of-fame',
    weeklyStarRewards: '/weekly-star/rewards',
    weeklyEvents: '/weekly-events',
    banners: '/banners',
    openingCustomizedGiftStar: '/opening-banners/customized-gift-star',
  },

  // Support & Moderation
  support: {
    feedbacks: '/feedbacks',
    appFeedbacks: '/feedbacks/app',
    messages: '/feedbacks/messages',
    faqItems: '/faq-items/list',
    reportUser: '/report-user/create',
    banAccountRequests: '/ban-account-requests',
    banAccountRequestsMine: '/ban-account-requests/mine',
    unbanAccountRequests: '/unban-account-requests',
    unbanAccountRequestsMine: '/unban-account-requests/mine',
    appeal: '/appeal',
  },
};
