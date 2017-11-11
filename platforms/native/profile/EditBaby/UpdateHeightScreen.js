// @flow
import type { NavigationProp } from 'core/types';
import React, { PureComponent } from 'react';
import { Screen } from '../../components';
import UpdateMeasurement from './UpdateMeasurement';

type Props = {
  navigation: NavigationProp,
};

class UpdateHeightScreen extends PureComponent {
  props: Props;
  static navigationOptions = {
    title: 'Update Height',
  };

  handleViewGraph = () => {
    this.props.navigation.navigate('graphDetail');
  };

  render() {
    return (
      <Screen>
        <UpdateMeasurement type="height" onViewGraph={this.handleViewGraph} />
      </Screen>
    );
  }
}

export default UpdateHeightScreen;
