// @flow
import type { Memory as MemoryType, MemoryEdge } from '../../common/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose } from 'ramda';
import { filter } from 'graphql-anywhere';
import Memory from './Memory';
import withPullToRefresh, {
  type PullToRefreshProps,
} from '../components/withPullToRefresh';

type Props = {
  babyId: String,
  memories: Array<MemoryEdge>,
  onEditMemory: (id: string) => void,
} & PullToRefreshProps;

const keyExtractor = obj => obj.id;

export class MemoryList extends PureComponent {
  props: Props;

  renderItem = ({ item }: { item: MemoryType }) => {
    return (
      <Memory
        babyId={this.props.babyId}
        onEditMemory={this.props.onEditMemory}
        {...filter(Memory.fragments.detail, item)}
      />
    );
  };

  render() {
    const { memories, refreshing, handleRefresh } = this.props;

    return (
      <FlatList
        data={memories}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export default compose(withPullToRefresh)(MemoryList);
