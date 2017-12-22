// @flow

const config = {
  appName: process.env.NUBABI_APP_NAME || 'app',
  appVersion: process.env.NUBABI_APP_VERSION,
  apiUrl: process.env.NUBABI_API_URL,
  environment: process.env.NUBABI_ENV || 'development',
  graphqlEndpoint: process.env.NUBABI_GRAPHQL_ENDPOINT,
  firebase: {
    apiKey: process.env.NUBABI_FIREBASE_API_KEY,
    authDomain: process.env.NUBABI_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NUBABI_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NUBABI_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUBABI_FIREBASE_MESSAGING_SENDER_ID,
  },
  sentryUrl: process.env.NUBABI_SENTRY_URL,
};

export default config;
