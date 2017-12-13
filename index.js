// @flow
require('core/polyfills/process');

import { AppRegistry } from 'react-native';
import setup from './platforms/native/main';

AppRegistry.registerComponent('NuBabiMobile', () => setup);
