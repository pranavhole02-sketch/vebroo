/**
 * Application Configuration & API Host constants.
 * Modify these values to connect the app to your own backend server and services.
 */
export const Config = {
  // API URLs
  API_BASE_URL: 'http://vobee-api.vobeefun.com/api',
  CDN_BASE_URL: 'https://cdn.vobeefun.com',
  
  // ZEGOCLOUD Real-Time Audio / Video SDK
  ZEGO_APP_ID: 0, // Insert your Zego AppID here (number)
  ZEGO_APP_SIGN: '', // Insert your 64-character Zego AppSign here

  // Razorpay Payment Gateway
  RAZORPAY_KEY_ID: 'rzp_live_placeholder', // Replace with your test/live Razorpay Key ID
  
  // OneSignal Push Notifications
  ONESIGNAL_APP_ID: '', // Insert your OneSignal App ID here

  // Facebook & Google Social Auth
  FACEBOOK_APP_ID: '',
  GOOGLE_WEB_CLIENT_ID: '',

  // App Metadata
  APP_NAME: 'VoBee',
  PACKAGE_NAME: 'com.vobeenew',
  VERSION: '1.0.0',
};
