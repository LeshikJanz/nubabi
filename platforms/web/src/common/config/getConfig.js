// prettier-ignore
// Used from transform-define
const { execSync } = require('child_process');

var configMap = {};
[
  "APP_NAME",
  "APP_VERSION",
  "API_URL",
  "GRAPHQL_ENDPOINT",
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_DATABASE_URL",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "SENTRY_URL"
].forEach(function(key) {
  const fullKey = "NUBABI_" + key;

  configMap["process.env." + fullKey] = process.env[fullKey];
});

if (!configMap["NUBABI_APP_VERSION"]) {
  configMap["process.env.NUBABI_APP_VERSION"] = "1.0.0-HEAD";
}

module.exports = configMap;
