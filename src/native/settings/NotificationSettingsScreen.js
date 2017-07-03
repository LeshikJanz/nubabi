// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import NotificationSettings from './NotificationSettings';

export class NotificationSettingsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Notifications',
  };

  render() {
    return (
      <Screen>
        <NotificationSettings />
      </Screen>
    );
  }
}

export default NotificationSettingsScreen;
