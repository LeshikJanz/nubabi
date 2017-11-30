// @flow
const RNFetchBlob = require('react-native-fetch-blob').default;

const { Blob, XMLHttpRequest } = RNFetchBlob.polyfill;
window.XMLHttpRequest = XMLHttpRequest;
window.Blob = Blob;
//XMLHttpRequest.setLog(3);

import { AppRegistry } from 'react-native';
import setup from './src/native/main';

AppRegistry.registerComponent('NuBabiMobile', () => setup);
