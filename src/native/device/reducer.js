import type {
  MobileDeviceState,
  DeviceState,
  Action,
} from '../../common/types';

const initialState = {
  isReactNative: true,
  deviceModel: null,
  deviceId: null,
  appVersion: null,
  systemVersion: null,
  bundleId: null,
  locale: null,
};

/* eslint-disable no-unused-vars */
const reducer = (
  state: MobileDeviceState = initialState,
  action: Action,
): DeviceState => {
  // TODO: react-native-device-info
  return state;
};

/* eslint-enable no-unused-vars */
export default reducer;
