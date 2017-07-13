// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import AddMemory from './AddMemory';

export class AddMemoryScreen extends PureComponent {
  static navigationOptions = {
    title: 'Add memory',
  };

  handleSubmit = () => {};

  render() {
    return (
      <Screen>
        <AddMemory />
      </Screen>
    );
  }
}

export default AddMemoryScreen;
