/**
 * Navigation Keys recovered from the application bundle.
 * Matches all 92 screens and routes in the VoBee application.
 */
export const NavKeys = {
  // Auth & Onboarding
  SplashScreen: 'SplashScreen',
  OpeningPage: 'OpeningPage',
  LoginScreen: 'LoginScreen',
  ProfileSetup: 'ProfileSetup',
  ChooseGender: 'ChooseGender',

  // Bottom Tabs
  BottomTabs: 'BottomTabs',
  HomeTab: 'HomeTab',
  MomentTab: 'MomentTab',
  SocialTab: 'SocialTab',
  MineTab: 'MineTab',

  // Home Sub-Tabs & Lists
  HomePopular: 'HomePopular',
  HomeMe: 'HomeMe',
  FansTab: 'FansTab',
  FollowTab: 'FollowTab',
  FollowFansTab: 'FollowFansTab',
  SearchPage: 'SearchPage',

  // Live Streaming & Voice Rooms
  HostPage: 'HostPage',
  AudiencePage: 'AudiencePage',
  CreateRoomScreen: 'CreateRoomScreen',
  RoomSetting: 'RoomSetting',
  RoomThemeScreen: 'RoomThemeScreen',
  RoomUserBlockList: 'RoomUserBlockList',
  KickHistory: 'KickHistory',
  RoomSupportScreen: 'RoomSupportScreen',

  // Chat & Social
  ChatScreen: 'ChatScreen',
  SocialChat: 'SocialChat',
  NotificationList: 'NotificationList',
  InviteFriends: 'InviteFriends',

  // Moments & Posts
  MomentFollow: 'MomentFollow',
  MomentMoments: 'MomentMoments',
  MomentMomentsHot: 'MomentMomentsHot',
  MomentMomentsNew: 'MomentMomentsNew',
  CreatePostScreen: 'CreatePostScreen',
  PostDetailScreen: 'PostDetailScreen',

  // Gifting & Lucky Bag
  LuckyBagDetailsScreen: 'LuckyBagDetailsScreen',
  LuckyBagReceivedHistoryScreen: 'LuckyBagReceivedHistoryScreen',
  LuckyBagRoomRecordScreen: 'LuckyBagRoomRecordScreen',
  ShopScreen: 'ShopScreen',
  MyCollection: 'MyCollection',

  // PK & Events
  GroupPkRankingScreen: 'GroupPkRankingScreen',
  GroupPkRulesScreen: 'GroupPkRulesScreen',
  PkKingEvent: 'PkKingEvent',
  WeeklyEvent: 'WeeklyEvent',
  RechageEvent: 'RechageEvent',
  TopRankingScreen: 'TopRankingScreen',
  TopGifters: 'TopGifters',
  TopRooms: 'TopRooms',
  TopStars: 'TopStars',

  // Wallet & Recharge
  Wallet: 'Wallet',
  WalletHistory: 'WalletHistory',
  WalletRecord: 'WalletRecord',
  OfflineRecharge: 'OfflineRecharge',
  ExchangeBeansToDiamond: 'ExchangeBeansToDiamond',

  // Profile & Levels
  NewMyProfileScreen: 'NewMyProfileScreen',
  EditProfile: 'EditProfile',
  LevelScreen: 'LevelScreen',
  LevelWealth: 'LevelWealth',
  CPScreen: 'CPScreen',
  MedalScreen: 'MedalScreen',
  MedalDetailScreen: 'MedalDetailScreen',
  MyMedals: 'MyMedals',
  CustomizedID: 'CustomizedID',
  VisitorsScreen: 'VisitorsScreen',
  AddAlbum: 'AddAlbum',
  MyActivity: 'MyActivity',

  // SVIP
  SvipNativeScreen: 'SvipNativeScreen',
  SvipRulesScreen: 'SvipRulesScreen',
  SvipSettingsScreen: 'SvipSettingsScreen',
  SvipWeb: 'SvipWeb',

  // Moderation & Appeals
  BanAccountScreen: 'BanAccountScreen',
  BanAccountApplyRecordScreen: 'BanAccountApplyRecordScreen',
  BanAccountSearchScreen: 'BanAccountSearchScreen',
  UnbanAccountScreen: 'UnbanAccountScreen',
  UnbanAccountApplyRecordScreen: 'UnbanAccountApplyRecordScreen',
  UnbanAccountSearchScreen: 'UnbanAccountSearchScreen',
  ReportUserScreen: 'ReportUserScreen',
  ReportUserDetailScreen: 'ReportUserDetailScreen',

  // Settings & Utilities
  SettingsScreen: 'SettingsScreen',
  LanguageScreen: 'LanguageScreen',
  EffectSettingsScreen: 'EffectSettingsScreen',
  ChangeCountry: 'ChangeCountry',
  DailyTask: 'DailyTask',
  Game: 'Game',
  LocalMusicScreen: 'LocalMusicScreen',
  HelpFeedbackScreen: 'HelpFeedbackScreen',
  FeedbackScreen: 'FeedbackScreen',
  FeedbackThreadScreen: 'FeedbackThreadScreen',
  HelpFaqCategoriesScreen: 'HelpFaqCategoriesScreen',
  HelpFaqDetailScreen: 'HelpFaqDetailScreen',
  OpeningBannerListScreen: 'OpeningBannerListScreen',
  OpeningBannerPreviewScreen: 'OpeningBannerPreviewScreen',
} as const;

export type NavKey = keyof typeof NavKeys;
