#!/usr/bin/env bash
export CI=true

if [[ "$BUDDYBUILD_BRANCH" =~ "release" ]]; then
  export NUBABI_APP_NAME=$NUBABI_APP_NAME
  export NUBABI_API_URL=$NUBABI_PRODUCTION_API_URL
  export NUBABI_FIREBASE_API_KEY=$NUBABI_PRODUCTION_FIREBASE_API_KEY
  export NUBABI_FIREBASE_DATABASE_URL=$NUBABI_PRODUCTION_FIREBASE_DATABASE_URL
  export NUBABI_FIREBASE_AUTH_DOMAIN=$NUBABI_PRODUCTION_FIREBASE_AUTH_DOMAIN
  export NUBABI_FIREBASE_STORAGE_BUCKET=$NUBABI_PRODUCTION_FIREBASE_STORAGE_BUCKET
  export NUBABI_FIREBASE_MESSAGING_SENDER_ID=$NUBABI_PRODUCTION_FIREBASE_MESSAGING_SENDER_ID
else
  export NUBABI_APP_NAME=$NUBABI_APP_NAME
  export NUBABI_API_URL=$NUBABI_STAGING_API_URL
  export NUBABI_FIREBASE_API_KEY=$NUBABI_STAGING_FIREBASE_API_KEY
  export NUBABI_FIREBASE_DATABASE_URL=$NUBABI_STAGING_FIREBASE_DATABASE_URL
  export NUBABI_FIREBASE_AUTH_DOMAIN=$NUBABI_STAGING_FIREBASE_AUTH_DOMAIN
  export NUBABI_FIREBASE_STORAGE_BUCKET=$NUBABI_STAGING_FIREBASE_STORAGE_BUCKET
  export NUBABI_FIREBASE_MESSAGING_SENDER_ID=$NUBABI_STAGING_FIREBASE_MESSAGING_SENDER_ID
fi

echo '{}' > $BUDDYBUILD_WORKSPACE/src/common/config/_dev.json # make eager require happy