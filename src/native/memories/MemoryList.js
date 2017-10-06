// @flow
import type { Memory as MemoryType, MemoryEdge } from '../../common/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose } from 'ramda';
import { filter } from 'graphql-anywhere';
import { Box, Text } from '../components';
import withPullToRefresh, {
  type PullToRefreshProps,
} from '../components/withPullToRefresh';
import Memory from './Memory';

type Props = {
  babyId: String,
  memories: Array<MemoryEdge>,
  onViewMemory: (id: string) => void,
  onEditMemory: (id: string) => void,
} & PullToRefreshProps;

const keyExtractor = obj => obj.id;

const MemoryListHeader = () => (
  <Box contentSpacing>
    <Text bold color="secondary">
      MEMORY TIMELINE
    </Text>
  </Box>
);

export class MemoryList extends PureComponent {
  props: Props;

  renderItem = ({ item }: { item: MemoryType }) => {
    return (
      <Memory
        babyId={this.props.babyId}
        onViewMemory={this.props.onViewMemory}
        onToggleLike={this.props.onToggleLikeMemory}
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
        ListHeaderComponent={MemoryListHeader}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

export default compose(withPullToRefresh)(MemoryList);
