// @flow
import type {
  ApolloQueryResult,
  File,
  Memory as MemoryType,
} from '../../common/types';
import React from 'react';
import { InteractionManager } from 'react-native';
import { assoc, compose, evolve, filter, omit, path, pick, uniq } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter as gqlFilter } from 'graphql-anywhere';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import {
  flattenEdges,
  isEmptyProp,
  withNetworkIndicatorActions,
} from '../../common/helpers/graphqlUtils';
import { processFiles } from '../shared/fileUtils';

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
            }
          }
        }
      }
      ${Memory.fragments.form}
    `,
    {
      props: ({
        mutate,
        ownProps: { id, toggleNetworkActivityIndicator },
      }) => ({
        onSubmit: async values => {
          // $FlowFixMe$
          return InteractionManager.runAfterInteractions({
            gen: async () => {
              toggleNetworkActivityIndicator(true);
              const input = assoc('id', id, evolve(transforms, values));
              input.files = await processFiles(input.files);

              // $FlowFixMe$
              return mutate({
                variables: { input },
                // TODO: this is NOT the best solutions but we're hitting too many
                // weird bugs with this (i.e Nothing found on memory list if you
                // navigate back prior to result getting back. Tried optimistic
                // response and #update as well without too much difference,
                // this is the simplest that makes it work.
                refetchQueries: ['ViewMemories'],
              }).finally(() => toggleNetworkActivityIndicator(false));
            },
          });
        },
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(EditMemory);
