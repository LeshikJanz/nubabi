// @flow
import React from 'react';
import { Box, Text } from '../components';
import SuggestedMemory from './SuggestedMemory';

type Props = {};

const suggestedMemories = [
  {
    title: '1st Solid Food',
    icon: 'ios-play',
    suggested: true,
  },
  {
    title: 'Crawling',
    icon: 'ios-play',
    suggested: true,
  },
];

export const SuggestedMemories = () => {
  return (
    <Box flex={1} contentSpacing backgroundColor="panel">
      <Box>
        <Text>SUGGESTED MEMORIES</Text>
      </Box>
      <Box flex={1} flexWrap="wrap" flexDirection="row" alignItems="flex-start">
        {suggestedMemories.map((memory, i) =>
          <SuggestedMemory key={i} {...memory} />,
        )}
      </Box>
    </Box>
  );
};

export default SuggestedMemories;
