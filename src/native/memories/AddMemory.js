// @flow
import type {
  ApolloQueryResult,
  CreateMemoryInput,
  State,
} from '../../common/types';
import type { SuggestedMemoryType } from './SuggestedMemories';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import {
  assoc,
  compose,
  filter,
  omit,
  path,
  pluck,
  propEq,
  propOr,
} from 'ramda';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import base64 from 'base-64';
import { ImageCacheProvider } from 'react-native-cached-image';
import {
  addEdgeToFragment,
  getTypenameForFile,
} from '../../common/helpers/graphqlUtils';
import { toggleNetworkActivityIndicator } from '../../common/ui/reducer';
import { appError } from '../../common/app/actions';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';

type Props = {
  currentBabyId: string,
  onSubmit: (input: CreateMemoryInput) => Promise<ApolloQueryResult<*>>,
  onAddVoiceNote: (id?: string) => void,
};

const suggestedMemoryTypeProps = (
  suggestedMemoryType: ?SuggestedMemoryType,
) => {
  if (!suggestedMemoryType) {
    return {};
  }

  return {
    title: suggestedMemoryType.title,
    suggestedMemoryType: suggestedMemoryType.id,
  };
};

export const AddMemory = ({
  onSubmit,
  onAddVoiceNote,
  suggestedMemoryType,
}: Props) => (
  <MemoryForm
    onSubmit={onSubmit}
    onAddVoiceNote={onAddVoiceNote}
    initialValues={suggestedMemoryTypeProps(suggestedMemoryType)}
    suggestedMemoryType={suggestedMemoryType}
  />
);

export default compose(
  connect(
    (state: State) => ({
      currentBabyId: state.babies.currentBabyId,
      currentUserId: state.viewer.uid,
    }),
    {
      appError,
      toggleNetworkActivityIndicator,
    },
  ),
  graphql(
    gql`
      mutation AddMemory($input: CreateMemoryInput!) {
        createMemory(input: $input) {
          edge {
            cursor
            node {
              ...MemoryItem
            }
          }
        }
      }
      ${Memory.fragments.detail}
    `,
    {
      props: ({
        mutate,
        ownProps: {
          currentBabyId,
          goBack,
          toggleNetworkActivityIndicator,
          currentUserId,
          suggestedMemoryType,
          appError,
        },
      }) => ({
        onSubmit: async (values: CreateMemoryInput) => {
          toggleNetworkActivityIndicator(true);

          const input = assoc('babyId', currentBabyId, values);

          goBack();

          return (
            // $FlowFixMe$
            mutate({
              variables: {
                input: omit(['removeFiles'], input),
              },
              optimisticResponse: {
                __typename: 'Mutation',
                createMemory: {
                  __typename: 'CreateOrUpdateMemoryPayload',
                  edge: {
                    __typename: 'MemoryEdge',
                    cursor: uuid.v4(),
                    node: {
                      __typename: 'Memory',
                      id: uuid.v4(),
                      ...input,
                      files: {
                        __typename: 'FileConnection',
                        count: input.files.length,
                        edges: input.files.map(file => {
                          return {
                            __typename: 'FileEdge',
                            node: {
                              __typename: getTypenameForFile(file),
                              id: uuid.v4(),
                              ...file,
                              thumb: null,
                              large: null,
                            },
                          };
                        }),
                      },
                      comments: {
                        __typename: 'CommentConnection',
                        count: 0,
                        edges: [],
                      },
                      likes: {
                        __typename: 'LikeConnection',
                        count: 0,
                        edges: [],
                      },
                      isLikedByViewer: false,
                      suggestedMemoryType: propOr(
                        null,
                        'id',
                        suggestedMemoryType,
                      ),
                    },
                  },
                },
              },
              update: (store, data) => {
                // Assign author as the current user if not present (optimistic)
                if (!data.data.createMemory.edge.node.author) {
                  const userId = base64.encode(`User:${currentUserId}`);
                  const avatar = store.data[`$${userId}.avatar`];

                  // eslint-disable-next-line no-param-reassign
                  data.data.createMemory.edge.node.author = {
                    __typename: 'User',
                    avatar: {
                      __typename: 'Avatar',
                      url: avatar.url,
                    },
                  };
                }

                const fragmentOptions = [
                  'createMemory',
                  ['memories'],
                  currentBabyId,
                  'head',
                ];

                addEdgeToFragment(
                  RecentMemories.fragments.memories,
                  ...fragmentOptions,
                )(store, data);

                addEdgeToFragment(
                  ViewMemories.fragments.list,
                  ...fragmentOptions,
                  { fragmentName: 'Memories' },
                )(store, data);
              },
            })
              .then(data => {
                const edges = path(
                  ['data', 'createMemory', 'edge', 'node', 'files', 'edges'],
                  data,
                );
                if (edges) {
                  const files = pluck('node', edges);
                  const images = pluck(
                    'url',
                    filter(propEq('__typename', 'Image'), files),
                  );
                  if (images.length) {
                    return ImageCacheProvider.cacheMultipleImages(images);
                  }
                }

                return Promise.resolve();
              })
              .catch(() =>
                appError(
                  'There was an error creating this memory. Please try again later.',
                ),
              )
              // $FlowFixMe$
              .finally(() => toggleNetworkActivityIndicator(false))
          );
        },
      }),
    },
  ),
)(AddMemory);
