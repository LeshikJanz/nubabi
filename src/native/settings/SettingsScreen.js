// @flow
import type { NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Settings from './Settings';

export class SettingsScreen extends PureComponent {
  static navigationOptions: NavigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <Screen>
        <Settings />
      </Screen>
    );
  }
}

export default SettingsScreen;
