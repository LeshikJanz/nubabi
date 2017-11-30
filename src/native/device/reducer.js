// @flow
import type {
  MobileDeviceState,
  DeviceState,
  Action,
} from '../../common/types';
import { assoc } from 'ramda';

const ORIENTATION_CHANGED = 'device/ORIENTATION_CHANGED';

const initialState = {
  isReactNative: true,
  deviceModel: null,
  deviceId: null,
  appVersion: null,
  systemVersion: null,
  bundleId: null,
  locale: null,
  orientation: null,
};

export const onOrientationChange = (orientation: 'LANDSCAPE' | 'PORTRAIT') => ({
  type: 'device/ORIENTATION_CHANGED',
  payload: orientation,
});

/* eslint-disable no-unused-vars */
const reducer = (
  state: MobileDeviceState = initialState,
  action: Action,
): DeviceState => {
  switch (action.type) {
    case ORIENTATION_CHANGED: {
      if (state.orientation !== action.payload) {
        return assoc('orientation', action.payload, state);
      }
    }
    default: {
      return state;
    }
  }
};

/* eslint-enable no-unused-vars */
export default reducer;
