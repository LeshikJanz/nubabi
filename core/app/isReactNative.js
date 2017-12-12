// @flow

// HACK:
// RN 0.45 broke this test:
// typeof navigator === 'object' && navigator.product === 'ReactNative';
// so we check on added function to Promise prototype added by FBJS

// $FlowFixMe$
const isReactNative = typeof Promise.prototype.done !== 'undefined';

export default isReactNative;
