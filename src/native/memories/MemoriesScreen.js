// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Memories from './Memories';

export class MemoriesScreen extends PureComponent {
  static navigationOptions = {
    title: 'Memories',
  };

  handleNavigateToAddMemory = () => {
    this.props.navigation.navigate('addMemory');
  };

  render() {
    return (
      <Screen>
        <Memories onAddMemory={this.handleNavigateToAddMemory} />
      </Screen>
    );
  }
}

export default MemoriesScreen;
