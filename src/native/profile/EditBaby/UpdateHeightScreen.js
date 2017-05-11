// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../../components';
import UpdateMeasurement from './UpdateMeasurement';

class UpdateHeightScreen extends PureComponent {
  static navigationOptions = {
    title: 'Update Height',
  };

  handleViewGraph = () => {
    console.log('navigating to height graph');
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
