// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { pathOr } from 'ramda';
import { Screen } from '../components';
import ActivityHistoryDetail from './ActivityHistoryDetail';

type Props = {
  navigation: NavigationProp,
};

export class ActivityHistoryDetailScreen extends PureComponent {
  props: Props;

  static navigationOptions = ({ navigation }) => ({
    title: pathOr('Activity History', ['state', 'params', 'title'], navigation),
    backTitle: 'History',
  });

  handleNavigateToActivity = (id: string, title: string) => {
    this.props.navigation.navigate('viewActivity', { id, title });
  };

  render() {
    return (
      <Screen>
        <ActivityHistoryDetail
          periodId={this.props.navigation.state.params.id}
          onNavigateToActivity={this.handleNavigateToActivity}
        />
      </Screen>
    );
  }
}

export default ActivityHistoryDetailScreen;
