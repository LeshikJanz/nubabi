// @flow
import React from 'react';
import { Box, HorizontalCardList, Text } from '../components';
import { __, find, memoize, propEq } from 'ramda';
import theme from '../../common/themes/defaultTheme';
import SuggestedMemory from './SuggestedMemory';

type Props = {
  onAddMemory: (title?: string) => void,
};

export type SuggestedMemoryType = {
  id: string,
  title: string,
  image: number,
};

export const suggestedMemories = [
  {
    id: 'solid-food',
    title: 'First Solid Food',
    image: require('../../common/images/memories/first-solid-food.png'),
  },
  {
    id: 'bath-time',
    title: 'Bath Time',
    image: require('../../common/images/memories/bath-time.png'),
  },
  {
    id: 'first-smile',
    title: 'First Smile',
    image: require('../../common/images/memories/first-smile.png'),
  },
  {
    id: 'first-birthday',
    title: 'First Birthday',
    image: require('../../common/images/memories/first-birthday.png'),
  },
  {
    id: 'first-tooth',
    title: 'First Tooth',
    image: require('../../common/images/memories/first-tooth.png'),
  },
  {
    id: 'slept-through',
    title: 'Slept Through',
    image: require('../../common/images/memories/slept-through.png'),
  },
];

// export const findSuggestedMemoryById = memoize(filter(propEquals('id', __))(suggestedMemories));
export const findSuggestedMemoryById = (id: string) =>
  find(propEq('id', id), suggestedMemories);
const renderHeader = () => (
  <Box contentSpacing>
    <Text bold color="secondary">
      SUGGESTED MEMORIES
    </Text>
  </Box>
);

export const SuggestedMemories = ({ onAddMemory }: Props) => {
  // TODO: remove bound function
  return (
    <Box backgroundColor="white">
      <HorizontalCardList
        items={suggestedMemories}
        headerTitle="SUGGESTED MEMORIES"
        headerTitleStyle={{
          fontSize: 12,
          fontWeight: 'bold',
          color: theme.colors.open.gray2,
        }}
        renderRow={item => (
          <SuggestedMemory {...item} onAddMemory={onAddMemory} />
        )}
        renderHeader={renderHeader}
      />
    </Box>
  );
};

export default SuggestedMemories;
