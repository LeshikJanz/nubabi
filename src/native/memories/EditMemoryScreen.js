// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import EditMemory from './EditMemory';

export class EditMemoryScreen extends PureComponent {
  static navigationOptions = {
    title: 'Edit Memory',
  };

  render() {
    return (
      <Screen>
        <EditMemory id={this.props.navigation.state.params.id} />
      </Screen>
    );
  }
}

export default EditMemoryScreen;
