// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Box } from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import SuggestedMemories from './SuggestedMemories';
import ViewMemories from './ViewMemories';

type Props = {
  onViewMemory: (id: string) => void,
  onAddMemory: (suggestedMemoryId?: string) => void,
  onEditMemory: (id: string) => void,
  shouldDisplaySuggestions: boolean,
};

export const Memories = ({
  onViewMemory,
  onAddMemory,
  onEditMemory,
  shouldDisplaySuggestions,
}: Props) => {
  // TODO: we lost pull to refresh by having a ScrollView here
  const viewMemories = (
    <ViewMemories onViewMemory={onViewMemory} onEditMemory={onEditMemory} />
  );

  return (
    <Box flex={1}>
      <AddMemoryHeader onAddMemory={onAddMemory} />

      {shouldDisplaySuggestions ? (
        <ScrollView>
          <SuggestedMemories onAddMemory={onAddMemory} />
          {viewMemories}
        </ScrollView>
      ) : (
        viewMemories
      )}
    </Box>
  );
};

export default compose(
  connect(state => ({
    shouldDisplaySuggestions: state.settings.memories.displaySuggestions,
  })),
)(Memories);
