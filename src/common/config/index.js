// We will probably store this on a reducer at some point.
/* global __DEV__: false */

const dynamicConfig = {
  appName: process.env.NUBABI_APP_NAME,
  apiUrl: process.env.NUBABI_API_URL,
  firebase: {
    apiKey: process.env.NUBABI_FIREBASE_API_KEY,
    authDomain: process.env.NUBABI_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NUBABI_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NUBABI_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUBABI_FIREBASE_MESSAGING_SENDER_ID,
  },
};

// Apparently body build invokes react-native bundle without setting dev=false
// so we export this from the post_clone script to differentiate
const config = process.env.CI ? dynamicConfig : require('./_dev.json');

export default config;
