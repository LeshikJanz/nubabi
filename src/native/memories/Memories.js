// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import SuggestedMemories from './SuggestedMemories';
import ViewMemories from './ViewMemories';

type Props = {
  onAddMemory: (suggestedMemoryId?: string) => void,
  onEditMemory: (id: string) => void,
};

export const Memories = ({ onAddMemory, onEditMemory }: Props) => {
  return (
    <Box flex={1}>
      <AddMemoryHeader onAddMemory={onAddMemory} />
      <ScrollView>
        <SuggestedMemories onAddMemory={onAddMemory} />
        <ViewMemories onEditMemory={onEditMemory} />
      </ScrollView>
    </Box>
  );
};

export default Memories;
