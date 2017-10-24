// @flow
const RNFetchBlob = require('react-native-fetch-blob').default;

const { Blob, XMLHttpRequest } = RNFetchBlob.polyfill;
window.XMLHttpRequest = XMLHttpRequest;
window.Blob = Blob;
//XMLHttpRequest.setLog(3);

// TODO: remove after deps update
// $FlowFixMe$
console.ignoredYellowBox = [
  'Warning: checkPropTypes',
  'Using <Image> with children',
];

import { AppRegistry } from 'react-native';
import setup from './src/native/main';

AppRegistry.registerComponent('NuBabiMobile', () => setup);
