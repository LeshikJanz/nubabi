// @flow
import type { MemoryConnection } from '../../common/types';
import React from 'react';
import { gql } from 'react-apollo';
import { AddButton, HorizontalCardList } from '../components';
import EmptyMemories from './EmptyMemories';
import { flattenEdges } from '../../common/helpers/graphqlUtils';

type Props = {
  memories: MemoryConnection,
  babyName: string,
  onViewMemory: () => void,
  onAddMemory: () => void,
  onViewAll: () => void,
};

export const RecentMemories = ({
  memories,
  babyName,
  onViewMemory,
  onAddMemory,
  onViewAll,
}: Props) => {
  const items = flattenEdges(memories);

  if (!items.length) {
    return (
      <EmptyMemories babyName={babyName} onNavigateToMemories={onViewAll} />
    );
  }

  const headerRight = (
    <AddButton style={{ marginRight: 10 }} onPress={onAddMemory} />
  );

  return (
    <HorizontalCardList
      items={items}
      headerTitle="Recent Memories"
      headerTitleSize={6}
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
                  id
                  contentType
                  url
                  ... on Image {
                    thumb {
                      url
                    }
                    large {
                      url
                    }
                  }
                  ... on Video {
                    thumb {
                      url
                    }
                  }
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
