# VoBee React Native App (Editable Source Code)

This repository contains the reconstructed, modular source code for **VoBee** (`com.vobeenew`), reverse-engineered and reconstructed from `app-release (1).apk`.

You can now open this project in VS Code, modify every screen, theme, API endpoint, and feature, and build it as your own application.

---

## Project Structure

```
D:\recovered-app
├── App.tsx                     # Main App container (Redux Provider, NavigationContainer)
├── index.js                    # Entry point registered with AppRegistry
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript path aliases & settings
├── babel.config.js             # Babel & Reanimated configuration
├── metro.config.js             # Metro bundler config
│
├── src
│   ├── api                     # Complete API layer
│   │   ├── client.ts           # Axios/Fetch HTTP client with JWT interceptor
│   │   ├── endpoints.ts        # All 196 endpoints recovered from bundle
│   │   └── services            # Service modules
│   │       ├── authService.ts  # Login, Phone OTP, Google/FB auth
│   │       ├── roomService.ts  # Live rooms, follow/unfollow, progress
│   │       ├── giftService.ts  # Gifting, gift bag, Lucky Bags
│   │       └── walletService.ts# Balance, recharge offers, exchange
│   │
│   ├── constants
│   │   ├── Config.ts           # Base URLs, Zego Keys, Razorpay Keys
│   │   └── NavKeys.ts          # Type-safe registry of all 92 screens
│   │
│   ├── navigation
│   │   ├── RootNavigator.tsx   # Stack Navigator mapping all screens
│   │   └── BottomTabs.tsx      # Bottom bar (Home, Rankings, Chat, Me)
│   │
│   ├── screens
│   │   ├── auth
│   │   │   └── LoginScreen.tsx       # Phone OTP, Google, Guest login
│   │   ├── home
│   │   │   └── HomeScreen.tsx        # Live room grid, categories, Go Live
│   │   ├── live
│   │   │   ├── HostPage.tsx          # ZEGOCLOUD host broadcasting & mic
│   │   │   ├── AudiencePage.tsx      # Live stream player, chat & gifts
│   │   │   └── CreateRoomScreen.tsx  # Create voice or video live room
│   │   ├── wallet
│   │   │   └── WalletScreen.tsx      # Diamond packs & Razorpay checkout
│   │   ├── profile
│   │   │   ├── ProfileScreen.tsx     # User stats, badges, menu
│   │   │   └── LevelScreen.tsx       # User level, exp progress & privileges
│   │   ├── pk
│   │   │   └── GroupPkRankingScreen.tsx # PK battle & Gifter leaderboards
│   │   └── chat
│   │       └── ChatScreen.tsx        # Real-time direct messaging UI
│   │
│   ├── components
│   │   ├── GiftModal.tsx             # Interactive gift selector & counts
│   │   └── LuckyBagModal.tsx         # Red packet / Lucky bag claim modal
│   │
│   ├── services
│   │   ├── zegoService.ts            # ZEGOCLOUD RTC Live Streaming Engine
│   │   └── razorpayService.ts        # Razorpay Payment Gateway integration
│   │
│   ├── store                         # Redux Toolkit State Management
│   │   ├── index.ts                  # Root store
│   │   └── slices
│   │       ├── authSlice.ts          # Current user & authentication state
│   │       ├── roomSlice.ts          # Active live room, participants & chat
│   │       └── walletSlice.ts        # Diamonds, coins, recharge packs
│   │
│   └── theme
│       └── colors.ts                 # Dark gradient palette, neon & gold
│
├── assets
│   └── fonts                         # 27 vector and typography font files
├── res                               # 667 visual image assets from original APK
└── raw-decompiled                    # Raw decompiler output reference
```

---

## How to Customize the Code

### 1. Changing Backend API & Host URLs
Open [`src/constants/Config.ts`](file:///D:/recovered-app/src/constants/Config.ts):
```typescript
export const Config = {
  API_BASE_URL: 'http://your-custom-backend.com/api',
  CDN_BASE_URL: 'https://your-custom-cdn.com',
  // ...
};
```

### 2. Setting Up Live Streaming (ZEGOCLOUD)
1. Sign up at [ZEGOCLOUD Console](https://console.zegocloud.com/).
2. Create an Express Video/Voice project and get your `AppID` and `AppSign`.
3. Add them in [`src/constants/Config.ts`](file:///D:/recovered-app/src/constants/Config.ts):
```typescript
ZEGO_APP_ID: 123456789,
ZEGO_APP_SIGN: 'your_64_char_app_sign_here',
```

### 3. Setting Up Payments (Razorpay)
In [`src/constants/Config.ts`](file:///D:/recovered-app/src/constants/Config.ts), set:
```typescript
RAZORPAY_KEY_ID: 'rzp_test_YourKeyHere',
```

### 4. Customizing UI & Branding Colors
Edit [`src/theme/colors.ts`](file:///D:/recovered-app/src/theme/colors.ts) to change:
- `primary`: Main brand accent (purple)
- `secondary`: Secondary neon pink
- `gold`: VIP / Coin highlights
- `background`: Dark background palette

---

## How to Run the App

1. **Install dependencies:**
   ```bash
   cd D:\recovered-app
   npm install --legacy-peer-deps
   ```

2. **Start the Metro bundler:**
   ```bash
   npm start
   ```

3. **Run on Android Emulator or Device:**
   ```bash
   npm run android
   ```
