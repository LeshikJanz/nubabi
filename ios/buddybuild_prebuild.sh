#!/usr/bin/env bash
source ../.env
cd ..
echo "Running tests..."

npm test -- --silent

### fix RN 0.46 error with third-party.sh script
echo "Fixing RN 0.46 glog compilation error"
curl https://raw.githubusercontent.com/facebook/react-native/5c53f89dd86160301feee024bce4ce0c89e8c187/scripts/ios-configure-glog.sh >ios-configure-glog.sh
chmod +x ios-configure-glog.sh
mv ios-configure-glog.sh node_modules/react-native/scripts/
###
