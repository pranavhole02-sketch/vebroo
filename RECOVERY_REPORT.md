# Reverse Engineering & Code Recovery Report

## Overview
- **App Name / Package:** `com.vobeenew` (VoBee)
- **Framework:** React Native (`v0.75` - `v0.76`)
- **Engine:** Hermes Bytecode (HBC Version 96 / `0x60`)
- **Original Source APK:** `C:\Users\prana\Downloads\app-release (1).apk`
- **Location on D Drive:** `D:\recovered-app`

---

## Recovered Components

### 1. Source Logic & Decompiled JavaScript
- **Decompiled File:** [`decompiled.js`](file:///D:/recovered-app/decompiled.js) (53 MB)
- Contains complete reconstructed JavaScript logic, state flows, action creators, and navigation routes.
- Extracted using `hermes-dec` (`hbc-decompiler`).

### 2. Identified Dependencies & Generated `package.json`
- **File:** [`package.json`](file:///D:/recovered-app/package.json)
- **Key Modules Identified:**
  - **Live RTC Streaming:** `zego-express-engine-reactnative` (ZEGOCLOUD)
  - **Payments:** `react-native-razorpay`, `react-native-nitro-in-app-purchase`
  - **Push Notifications & Analytics:** `react-native-onesignal`, `@react-native-firebase/app`, `@react-native-firebase/auth`, `@react-native-firebase/crashlytics`, `@react-native-firebase/messaging`
  - **Social Auth:** `react-native-fbsdk-next`, `@react-native-google-signin/google-signin`
  - **Animations & Graphics:** `lottie-react-native`, `react-native-svga-player`, `react-native-linear-gradient`, `react-native-svg`
  - **Navigation:** `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`, `@react-navigation/drawer`
  - **State Management:** Redux (`react-redux`, `redux`)

### 3. Screen & Navigation Structure
- `LoginScreen`
- `HomeTab`, `FansTab`, `FollowTab`, `FollowFansTab`
- `AudiencePage`, `HostPage`, `CreateRoomScreen`
- `ChatScreen`, `CreatePostScreen`
- `AccountsScreen`, `EditProfile`, `BanAccountScreen`
- `LevelScreen`, `MedalScreen`, `MedalDetailScreen`
- `GroupPkRankingScreen`, `GroupPkRulesScreen`
- `LuckyBagDetailsScreen`, `LuckyBagReceivedHistoryScreen`, `LuckyBagRoomRecordScreen`
- `HelpFeedbackScreen`, `HelpFaqCategoriesScreen`, `HelpFaqDetailScreen`
- `LanguageScreen`, `LocalMusicScreen`

### 4. Backend Endpoints & CDN
- **API Base URL:** `http://vobee-api.vobeefun.com/`
- **CDN Host:** `https://cdn.vobeefun.com/`
- **Key API Routes:**
  - `/direct-chat/conversations`
  - `/chat/messages`
  - `/gift/send-from-bag`, `/gift/top-senders`, `/gift/top-receivers`
  - `/group-pk/config`, `/group-pk/rankings/`
  - `/lucky-bag/room/`
  - `/rooms/by-numeric-id`
  - `/daily-tasks/user-progress`

### 5. Media & Assets
- **Fonts (27 files):** [`assets/fonts/`](file:///D:/recovered-app/assets/fonts/) (Baloo, Inter family, FontAwesome 5/6, Ionicons, MaterialCommunityIcons, etc.)
- **Images (667 files):** [`res/`](file:///D:/recovered-app/res/)
