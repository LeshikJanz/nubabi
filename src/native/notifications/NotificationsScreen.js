// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Notifications from './Notifications';

export class NotificationsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Notifications',
  };

  render() {
    return (
      <Screen>
        <Notifications />
      </Screen>
    );
  }
}

export default NotificationsScreen;
