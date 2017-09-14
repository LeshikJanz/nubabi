// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components/Screen';
import ActivityHistory from './ActivityHistoryList';

export class ActivityHistoryScreen extends PureComponent {
  static navigationOptions = {
    title: 'Activity History',
  };

  render() {
    return (
      <Screen>
        <ActivityHistory />
      </Screen>
    );
  }
}

export default ActivityHistoryScreen;
