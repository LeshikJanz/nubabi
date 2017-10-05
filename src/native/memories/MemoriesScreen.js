// @flow
import type { NavigationProp } from '../../common/types';
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Memories from './Memories';

type Props = {
  navigation: NavigationProp,
};
export class MemoriesScreen extends PureComponent {
  props: Props;

  static navigationOptions = {
    title: 'Memories',
  };

  handleNavigateToAddMemory = (suggestedMemoryId?: string) => {
    this.props.navigation.navigate('addMemory', { suggestedMemoryId });
  };

  handleNavigateToEditMemory = (id: string) => {
    this.props.navigation.navigate('editMemory', { id });
  };

  render() {
    return (
      <Screen>
        <Memories
          onAddMemory={this.handleNavigateToAddMemory}
          onEditMemory={this.handleNavigateToEditMemory}
        />
      </Screen>
    );
  }
}

export default MemoriesScreen;
