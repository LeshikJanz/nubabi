// @flow
import type { NavigationProp, NavigationOptions } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Settings from './Settings';

type Props = {
  navigation: NavigationProp,
};

export class SettingsScreen extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Settings',
  };

  handleNotificationSettings = () => {
    this.props.navigation.navigate('notificationSettings');
  };

  handleUserProfile = () => {
    this.props.navigation.navigate('editUser');
  };

  handleFriends = () => {
    this.props.navigation.navigate('friends');
  };

  render() {
    return (
      <Screen>
        <Settings
          onNavigateToNotificationSettings={this.handleNotificationSettings}
          onNavigateToEditProfile={this.handleUserProfile}
          onNavigateToFriends={this.handleFriends}
        />
      </Screen>
    );
  }
}

export default SettingsScreen;
