// @flow
import type { NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Settings from './Settings';

export class SettingsScreen extends PureComponent {
  static navigationOptions: NavigationOptions = {
    title: 'Settings',
  };

  handleNotificationSettings = () => {
    this.props.navigation.navigate('notificationSettings');
  };

  handleUserProfile = () => {
    this.props.navigation.navigate('editUser');
  };

  render() {
    return (
      <Screen>
        <Settings
          onNavigateToNotificationSettings={this.handleNotificationSettings}
          onNavigateToEditProfile={this.handleUserProfile}
        />
      </Screen>
    );
  }
}

export default SettingsScreen;
