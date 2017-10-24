// @flow

// TODO: remove after deps update
// $FlowFixMe$
console.ignoredYellowBox = [
  'Warning: checkPropTypes',
  'Using <Image> with children',
];

import { AppRegistry } from 'react-native';
import setup from './src/native/main';

AppRegistry.registerComponent('NuBabiMobile', () => setup);
