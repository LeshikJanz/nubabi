// @flow
import React, { PureComponent } from 'react';
import { FlatList, Image } from 'react-native';
import { partial } from 'ramda';
import { Box, Card, Text } from '../components';
import { keyExtractor } from '../../../core/helpers/graphqlUtils';
import {
  renderHeader as Header,
  suggestedMemories,
} from './SuggestedMemoriesList';
import AddMemoryHeader from './AddMemoryHeader';

type Props = {
  onAddMemory: (suggestedMemoryId?: string) => void,
};

class SuggestedMemoriesGrid extends PureComponent {
  props: Props;

  renderItem = ({ item }) => {
    const onAddMemory = partial(this.props.onAddMemory, [item.id]);

    return (
      <Card
        height={7}
        padding={0.5}
        marginHorizontal={1}
        alignItems="center"
        onPress={onAddMemory}
      >
        <Image
          source={item.image}
          style={{ flex: 1, width: 60, height: 60 }}
          resizeMode="contain"
        />
        <Box justifyContent="flex-end">
          <Text>{item.title}</Text>
        </Box>
      </Card>
    );
  };

  render() {
    const { onAddMemory } = this.props;

    return (
      <Box flex={1}>
        <AddMemoryHeader onAddMemory={onAddMemory} />
        <Box justifyContent="center" alignItems="stretch">
          <Header centered />
        </Box>
        <FlatList
          data={suggestedMemories}
          numColumns={2}
          keyExtractor={keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
        />
      </Box>
    );
  }
}

export default SuggestedMemoriesGrid;
