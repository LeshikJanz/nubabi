import React, { PureComponent } from 'react';
import { Screen } from '../../components';
import UpdateMeasurement from './UpdateMeasurement';

class UpdateWeightScreen extends PureComponent {
  static navigationOptions = {
    title: 'Update Weight',
  };

  handleViewGraph = () => {
    console.log('navigating to weight graph');
  };

  render() {
    return (
      <Screen>
        <UpdateMeasurement type="weight" onViewGraph={this.handleViewGraph} />
      </Screen>
    );
  }
}

export default UpdateWeightScreen;
