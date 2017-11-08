#!/usr/bin/env bash
source ../.env
echo "Creating Sentry release and upload sourcemaps"
curl https://sentry.io/api/0/projects/mylearningbaby/nubabi-mobile/releases/ \
  -X POST \
  -H "Authorization: Bearer $NUBABI_SENTRY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"version\": \"$NUBABI_APP_VERSION\" }" > /dev/null

for file in $BUDDYBUILD_BUILD_ID/react_native_source_maps/*; do
  curl https://sentry.io/api/0/projects/mylearningbaby/nubabi-mobile/releases/$NUBABI_APP_VERSION/files/ \
    -X POST \
    -H "Authorization: Bearer $NUBABI_SENTRY_AUTH_TOKEN" \
    -F file=@$file \
    -F name="/$file" > /dev/null
done

echo "Successfully uploaded release artifacts"

# Navigate to project's root
cd ..
mkdir buddybuild_artifacts && mkdir buddybuild_artifacts/Jest

echo "Running test for CI..."
npm test -- --silent --outputFile=buddybuild_artifacts/Jest/jest.json --json
