import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { filter } from 'graphql-anywhere';
import Memory from './Memory';

const keyExtractor = obj => obj.id;

export class MemoryList extends PureComponent {
  renderItem({ item }) {
    return <Memory {...filter(Memory.fragments.detail, item)} />;
  }
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
