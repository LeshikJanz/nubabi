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
    title: 'Capture',
  };

  handleNavigateToMemory = (id: string) => {
    this.props.navigation.navigate('viewMemory', {
      id,
      returnKey: this.props.navigation.state.key,
    });
  };

  handleNavigateToAddMemory = (suggestedMemoryId?: string) => {
    this.props.navigation.navigate('addMemory', {
      /*
       For some reason we're passed down an event here sometimes
       That ends up blocking the interaction with the Add Memory button
       in header
       */
      suggestedMemoryId:
        typeof suggestedMemoryId === 'string' ? suggestedMemoryId : null,
    });
  };

  handleNavigateToEditMemory = (id: string) => {
    this.props.navigation.navigate('editMemory', { id });
  };

  render() {
    return (
      <Screen>
        <Memories
          onViewMemory={this.handleNavigateToMemory}
          onAddMemory={this.handleNavigateToAddMemory}
          onEditMemory={this.handleNavigateToEditMemory}
        />
      </Screen>
    );
  }
}

export default MemoriesScreen;
