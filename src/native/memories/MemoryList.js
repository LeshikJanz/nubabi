// @flow
import type { MemoryEdge, Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { filter } from 'graphql-anywhere';
import Memory from './Memory';

type Props = {
  babyId: String,
  memories: Array<MemoryEdge>,
};

const keyExtractor = obj => obj.id;

export class MemoryList extends PureComponent {
  props: Props;

  renderItem = ({ item }: { item: MemoryType }) => {
    return (
      <Memory
        babyId={this.props.babyId}
        {...filter(Memory.fragments.detail, item)}
      />
    );
  };

  render() {
    const { memories } = this.props;

    return (
      <FlatList
        data={memories}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default MemoryList;
