// @flow
import type {
  ApolloQueryResult,
  CreateMemoryInput,
  State,
} from '../../common/types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { assoc, compose, pick, omit, path, pluck, filter, propEq } from 'ramda';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import { ImageCacheProvider } from 'react-native-cached-image';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';
import { addEdgeToFragment } from '../../common/helpers/graphqlUtils';
import { processFiles } from '../shared/fileUtils';
import { toggleNetworkActivityIndicator } from '../../common/ui/reducer';

type Props = {
  currentBabyId: string,
  onSubmit: (input: CreateMemoryInput) => Promise<ApolloQueryResult<*>>,
  onAddVoiceNote: (id?: string) => void,
};

export const AddMemory = ({ onSubmit, onAddVoiceNote }: Props) =>
  <MemoryForm onSubmit={onSubmit} onAddVoiceNote={onAddVoiceNote} />;

export default compose(
  connect(({ babies }: State) => pick(['currentBabyId'], babies), {
    toggleNetworkActivityIndicator,
  }),
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
        ownProps: { currentBabyId, goBack, toggleNetworkActivityIndicator },
      }) => ({
        onSubmit: async (values: CreateMemoryInput) => {
          toggleNetworkActivityIndicator(true);

          const input = {
            ...values,
            babyId: currentBabyId,
            files: await processFiles(values.files),
          };

          goBack();

          // $FlowFixMe$
          const mutation = mutate({
            variables: {
              input: omit(['removeFiles'], input),
            },
            optimisticResponse: {
              __typename: 'Mutation',
              createMemory: {
                __typename: 'CreateOrUpdateMemoryPayload',
                edge: {
                  __typename: 'MemoryEdge',
                  node: {
                    __typename: 'Memory',
                    id: uuid.v4(),
                    ...input,
                    files: {
                      __typename: 'FileConnection',
                      count: input.files.length,
                      // $FlowFixMe$
                      edges: input.files.map(file => {
                        let typename = 'GenericFile';
                        if (file.contentType.startsWith('image')) {
                          typename = 'Image';
                        } else if (file.contentType.startsWith('video')) {
                          typename = 'Video';
                        } else if (file.contentType.startsWith('audio')) {
                          typename = 'Audio';
                        }
                        return {
                          __typename: 'FileEdge',
                          node: {
                            __typename: typename,
                            id: uuid.v4(),
                            ...file,
                            thumb: null,
                          },
                        };
                      }),
                    },
                    comments: {
                      __typename: 'CommentConnection',
                      count: 0,
                      edges: [],
                    },
                  },
                },
              },
            },
            update: (store, data) => {
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
          });

          return mutation
            .then(data => {
              const edges = path(
                ['data', 'createMemory', 'edge', 'node', 'files', 'edges'],
                data,
              );
              if (!edges) {
                return null;
              }
              const files = pluck('node', edges);
              const images = pluck(
                'url',
                filter(propEq('__typename', 'Image'), files),
              );
              if (images.length) {
                return ImageCacheProvider.cacheMultipleImages(images);
              }
            })
            .finally(() => toggleNetworkActivityIndicator(false));
        },
      }),
    },
  ),
)(AddMemory);
