// @flow
import React from 'react';
import { Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import SuggestedMemories from './SuggestedMemories';
import ViewMemories from './ViewMemories';

type Props = {
  onAddMemory: () => void,
};

export const Memories = ({ onAddMemory }: Props) => {
  return (
    <Box flex={1}>
      <AddMemoryHeader onAddMemory={onAddMemory} />
      <ViewMemories />
    </Box>
  );
};

export default Memories;
