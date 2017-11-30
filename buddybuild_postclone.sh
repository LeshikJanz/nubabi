#!/usr/bin/env bash
export GIT_REVISION_SHA=$(git rev-parse HEAD)
export GIT_REVISION_SHORT_SHA=$(git rev-parse --short HEAD)

BUNDLE_BASE_VERSION=$(/usr/libexec/PListBuddy -c "Print :CFBundleShortVersionString" $BUDDYBUILD_WORKSPACE/ios/NubabiMobile/Info.plist)

if [[ "$BUDDYBUILD_BRANCH" =~ "release" ]]; then
  NUBABI_ENV=release
  export NUBABI_APP_NAME=$NUBABI_APP_NAME
  export NUBABI_APP_VERSION="${BUNDLE_BASE_VERSION}+${BUDDYBUILD_BUILD_NUMBER}"
  export NUBABI_API_URL=$NUBABI_PRODUCTION_API_URL
  export NUBABI_FIREBASE_API_KEY=$NUBABI_PRODUCTION_FIREBASE_API_KEY
  export NUBABI_FIREBASE_DATABASE_URL=$NUBABI_PRODUCTION_FIREBASE_DATABASE_URL
  export NUBABI_FIREBASE_AUTH_DOMAIN=$NUBABI_PRODUCTION_FIREBASE_AUTH_DOMAIN
  export NUBABI_FIREBASE_STORAGE_BUCKET=$NUBABI_PRODUCTION_FIREBASE_STORAGE_BUCKET
  export NUBABI_FIREBASE_MESSAGING_SENDER_ID=$NUBABI_PRODUCTION_FIREBASE_MESSAGING_SENDER_ID
else
  NUBABI_ENV=staging
  export NUBABI_APP_NAME=$NUBABI_APP_NAME
  export NUBABI_APP_VERSION="${BUNDLE_BASE_VERSION}-dev+${BUDDYBUILD_BUILD_NUMBER}.sha.${GIT_REVISION_SHORT_SHA}"
  export NUBABI_API_URL=$NUBABI_STAGING_API_URL
  export NUBABI_FIREBASE_API_KEY=$NUBABI_STAGING_FIREBASE_API_KEY
  export NUBABI_FIREBASE_DATABASE_URL=$NUBABI_STAGING_FIREBASE_DATABASE_URL
  export NUBABI_FIREBASE_AUTH_DOMAIN=$NUBABI_STAGING_FIREBASE_AUTH_DOMAIN
  export NUBABI_FIREBASE_STORAGE_BUCKET=$NUBABI_STAGING_FIREBASE_STORAGE_BUCKET
  export NUBABI_FIREBASE_MESSAGING_SENDER_ID=$NUBABI_STAGING_FIREBASE_MESSAGING_SENDER_ID
fi

# I've tried everything else, BuddyBuild is just weird when it comes to
# environment variables, they don't get preserved between custom script
# stages, so I had to resort to just nuking and replacing the file.
tee $BUDDYBUILD_WORKSPACE/src/common/config/index.js > /dev/null <<EOF
const config = {
  appName: "$NUBABI_APP_NAME",
  appVersion: "$NUBABI_APP_VERSION",
  apiUrl: "$NUBABI_API_URL",
  firebase: {
    "apiKey": "$NUBABI_FIREBASE_API_KEY",
    "authDomain": "$NUBABI_FIREBASE_AUTH_DOMAIN",
    "databaseURL": "$NUBABI_FIREBASE_DATABASE_URL",
    "storageBucket": "$NUBABI_FIREBASE_STORAGE_BUCKET",
    "messagingSenderId": "$NUBABI_FIREBASE_MESSAGING_SENDER_ID",
  },
  sentryUrl: "$NUBABI_SENTRY_URL"
};

export default config;
EOF
export BABEL_ENV="production"
echo "Exported config for environment $NUBABI_ENV to src/common/config/index.js"
cat $BUDDYBUILD_WORKSPACE/src/common/config/index.js
# Workaround the fact that buddybuild doesn't seem to handle env vars correctly
tee $BUDDYBUILD_WORKSPACE/.env > /dev/null <<EOF
  export NUBABI_APP_VERSION=$NUBABI_APP_VERSION
EOF
