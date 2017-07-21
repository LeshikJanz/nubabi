// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import ViewMemory from './ViewMemory';

type Props = {
  navigation: NavigationProp,
};
export class ViewMemoryScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Memory',
  };

  // TODO: remove duplication
  handleNavigateToAddMemory = () => {
    this.props.navigation.navigate('addMemory');
  };

  handleNavigateToEditMemory = (id: string) => {
    this.props.navigation.navigate('editMemory', { id });
  };

  render() {
    return (
      <Screen>
        <AddMemoryHeader onAddMemory={this.handleNavigateToAddMemory} />

        <Box flex={1} style={() => ({ marginTop: 9 })}>
          <ViewMemory
            id={this.props.navigation.state.params.id}
            onEditMemory={this.handleNavigateToEditMemory}
          />
        </Box>
      </Screen>
    );
  }
}

export default ViewMemoryScreen;
