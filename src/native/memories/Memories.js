// @flow
import React from 'react';
import { Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import SuggestedMemories from './SuggestedMemories';
import ViewMemories from './ViewMemories';

type Props = {
  onAddMemory: () => void,
  onEditMemory: (id: string) => void,
};

export const Memories = ({ onAddMemory, onEditMemory }: Props) => {
  return (
    <Box flex={1}>
      <AddMemoryHeader onAddMemory={onAddMemory} />
      <ViewMemories onEditMemory={onEditMemory} />
    </Box>
  );
};

export default Memories;
