// @flow
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import {
  Box,
  displayLoadingState,
  requireBaby,
  withPullToRefresh,
} from '../components';
import AddMemoryHeader from './AddMemoryHeader';
import SuggestedMemoriesList from './SuggestedMemoriesList';
import SuggestedMemoriesGrid from './SuggestedMemoriesGrid';
import ViewMemories from './ViewMemories';
import {
  isEmptyProp,
  mapEdgesToProp,
} from '../../../core/helpers/graphqlUtils';

type Props = {
  onViewMemory: (id: string) => void,
  onAddMemory: (suggestedMemoryId?: string) => void,
  onEditMemory: (id: string) => void,
  shouldDisplaySuggestions: boolean,
} & GraphQLDataProps<*>;

export const Memories = ({
  onViewMemory,
  onAddMemory,
  onEditMemory,
  shouldDisplaySuggestions,
  data,
  currentBabyId,
  memories,
}: Props) => {
  const viewMemories = (
    <ViewMemories
      data={data}
      memories={memories}
      currentBabyId={currentBabyId}
      onViewMemory={onViewMemory}
      onEditMemory={onEditMemory}
    />
  );

  return (
    <Box flex={1}>
      <AddMemoryHeader onAddMemory={onAddMemory} />

      {shouldDisplaySuggestions ? (
        <ScrollView refreshControl={<Refresher data={data} />}>
          <SuggestedMemoriesList onAddMemory={onAddMemory} />
          {viewMemories}
        </ScrollView>
      ) : (
        viewMemories
      )}
    </Box>
  );
};

const Refresher = withPullToRefresh(({ refreshing, handleRefresh }) => {
  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
});

export default compose(
  connect(state => ({
    shouldDisplaySuggestions: state.settings.memories.displaySuggestions,
    currentBabyId: state.babies.currentBabyId,
  })),
  requireBaby,
  graphql(
    gql`
      query ViewMemories($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            ...Memories
          }
        }
      }
      ${ViewMemories.fragments.list}
    `,
    {
      options: ({ currentBabyId: babyId }) => ({
        variables: { babyId },
        fetchPolicy: 'cache-and-network',
      }),
      props: mapEdgesToProp('viewer.baby.memories', 'memories'),
    },
  ),
  branch(isEmptyProp('memories'), renderComponent(SuggestedMemoriesGrid)),
  displayLoadingState,
)(Memories);
