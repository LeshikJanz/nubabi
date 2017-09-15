// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components/Screen';
import ActivityHistory from './ActivityHistory';

export class ActivityHistoryScreen extends PureComponent {
  static navigationOptions = {
    title: 'Activity History',
    headerBackTitle: 'History',
  };

  handleNavigateToPeriod = (id: string, title: string) => {
    this.props.navigation.navigate('activityHistoryDetail', { id, title });
  };

  render() {
    return (
      <Screen>
        <ActivityHistory onNavigateToPeriod={this.handleNavigateToPeriod} />
      </Screen>
    );
  }
}

export default ActivityHistoryScreen;
