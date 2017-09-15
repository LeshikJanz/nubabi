// @flow
import type {
  ApolloQueryResult,
  File,
  Memory as MemoryType,
} from '../../common/types';
import React from 'react';
import { assoc, compose, evolve, filter, path, pick, uniq } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter as gqlFilter } from 'graphql-anywhere';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import { flattenEdges, isEmptyProp } from '../../common/helpers/graphqlUtils';
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
      props: ({ mutate, ownProps: { id } }) => ({
        onSubmit: async values => {
          const input = assoc('id', id, evolve(transforms, values));
          input.files = await processFiles(input.files);

          return mutate({ variables: { input } });
        },
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(EditMemory);
