// prettier-ignore
// Used from transform-define
var configMap = {};
[
  'APP_NAME',
  'APP_VERSION',
  'API_URL',
  'GRAPHQL_ENDPOINT',
  'ENV',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'SENTRY_URL',
].forEach(function(key) {
  const fullKey = 'NUBABI_' + key;

  configMap['process.env.' + fullKey] = process.env[fullKey];
});

// FIXME: this should be "process.env.NUBABI_APP_VERSION"
if (!configMap['NUBABI_APP_VERSION']) {
  configMap['process.env.NUBABI_APP_VERSION'] = 'DEV';
}

module.exports = configMap;
