// @flow
import type { MemoryConnection } from '../../common/types';
import React from 'react';
import { gql } from 'react-apollo';
import { HorizontalCardList, AddButton } from '../components';
import { flattenEdges } from '../../common/helpers/graphqlUtils';

type Props = {
  memories: MemoryConnection,
  onViewMemory: () => void,
  onAddMemory: () => void,
};

export const RecentMemories = ({
  memories,
  onViewMemory,
  onAddMemory,
}: Props) => {
  const headerRight = (
    <AddButton style={{ marginRight: 10 }} onPress={onAddMemory} />
  );

  return (
    <HorizontalCardList
      items={flattenEdges(memories)}
      headerTitle="Recent Memories"
      headerTitleSize={4}
      headerRight={headerRight}
      onItemPress={onViewMemory}
    />
  );
};

RecentMemories.fragments = {
  memories: gql`
    fragment RecentMemories on Baby {
      # Memories are ordered by "createdAt" in DESC order
      memories(first: 5) {
        edges {
          node {
            id
            title
            files(first: 1) {
              edges {
                node {
                  url
                  contentType
                }
              }
            }
          }
        }
      }
    }
  `,
};

export default RecentMemories;
