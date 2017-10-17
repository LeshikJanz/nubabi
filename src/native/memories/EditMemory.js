// @flow
import type {
  ApolloQueryResult,
  File,
  Memory as MemoryType,
} from '../../common/types';
import React from 'react';
import {
  ap,
  assoc,
  compose,
  evolve,
  filter,
  findIndex,
  lensIndex,
  lensPath,
  map,
  merge,
  omit,
  path,
  pathEq,
  set,
  uniq,
  view,
} from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter as gqlFilter } from 'graphql-anywhere';
import uuid from 'react-native-uuid';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import { ViewMemories } from './ViewMemories';
import RecentMemories from '../profile/RecentMemories';
import {
  flattenEdges,
  getTypenameForFile,
  isEmptyProp,
  replaceEdgeInFragment,
  withNetworkIndicatorActions,
} from '../../common/helpers/graphqlUtils';

type Props = {
  memory: MemoryType,
  onSubmit: (input: any) => Promise<ApolloQueryResult<*>>,
  onAddVoiceNote: (id?: string) => void,
  files: Array<File>,
};

export const EditMemory = ({
  memory,
  onSubmit,
  onAddVoiceNote,
  files,
}: Props) => {
  return (
    <MemoryForm
      initialValues={{
        ...gqlFilter(Memory.fragments.form, memory),
        files,
      }}
      mode="edit"
      onSubmit={onSubmit}
      onAddVoiceNote={onAddVoiceNote}
    />
  );
};

const transforms = {
  files: filter(isEmptyProp('id')),
  removeFiles: uniq,
};

export default compose(
  withCurrentBaby,
  withNetworkIndicatorActions,
  graphql(
    gql`
      query EditMemory($id: ID!, $babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            memory(id: $id) {
              id
              ...MemoryForm
            }
          }
        }
      }
      ${Memory.fragments.form}
    `,
    {
      options: ({ id, currentBabyId: babyId }) => ({
        variables: { babyId, id },
        fetchPolicy: 'network-only',
      }),
      props: ({ data }) => {
        return {
          data,
          memory: path(['viewer', 'baby', 'memory'], data),
          // TODO: simplify this
          files: flattenEdges(
            path(['viewer', 'baby', 'memory', 'files'], data),
          ),
        };
      },
    },
  ),
  graphql(
    gql`
      mutation EditMemory($input: UpdateMemoryInput!) {
        updateMemory(input: $input) {
          edge {
            cursor
            node {
              id
              ...MemoryForm
              ...MemoryItem
            }
          }
        }
      }
      ${Memory.fragments.form}
      ${Memory.fragments.detail}
    `,
    {
      props: ({
        mutate,
        ownProps: { id, toggleNetworkActivityIndicator, currentBabyId, goBack },
      }) => ({
        onSubmit: async values => {
          // $FlowFixMe$
          toggleNetworkActivityIndicator(true);
          goBack();

          const input = assoc('id', id, evolve(transforms, values));
          const newFiles = compose(
            edges => ({
              __typename: 'FileConnection',
              count: edges.length,
              edges,
            }),
            map(file => ({
              __typename: 'FileEdge',
              node: merge(file, {
                __typename: getTypenameForFile(file),
                id: file.id || uuid.v4(),
                thumb: file.thumb || null,
                large: file.large || null,
              }),
            })),
            filter(file => !input.removeFiles.includes(file.id)),
          )(values.files);

          // $FlowFixMe$
          return mutate({
            variables: { input },
            optimisticResponse: {
              __typename: 'Mutation',
              updateMemory: {
                __typename: 'CreateOrUpdateMemoryPayload',
                edge: {
                  __typename: 'MemoryEdge',
                  node: {
                    __typename: 'Memory',
                    id,
                    ...omit(['removeFiles'], values),
                    files: newFiles,
                  },
                },
              },
            },
            // $FlowFixMe$
            update: (store, data) => {
              const memory = path(['data', 'updateMemory', 'edge'], data);

              if (memory) {
                replaceEdgeInFragment(
                  memory,
                  RecentMemories.fragments.memories,
                  currentBabyId,
                  ['memories', 'edges'],
                  { fragmentName: 'RecentMemories' },
                )(store, data);
              }
            },
          }).finally(() => {
            toggleNetworkActivityIndicator(false);
          });
        },
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(EditMemory);
