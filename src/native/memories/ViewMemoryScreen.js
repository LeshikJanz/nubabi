// @flow
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import ViewMemories from './ViewMemories';

export class ViewMemoryScreen extends PureComponent {
  static navigationOptions = {
    title: 'Memory',
  };

  // TODO: remove duplication
  handleNavigateToAddMemory = () => {
    this.props.navigation.navigate('addMemory');
  };

  render() {
    return (
      <Screen>
        <AddMemoryHeader onAddMemory={this.handleNavigateToAddMemory} />
        <Box flex={1} style={() => ({ marginTop: 9 })}>
          <ViewMemories
            navigatedToMemory={this.props.navigation.state.params.id}
          />
        </Box>
      </Screen>
    );
  }
}

export default ViewMemoryScreen;
