// @flow
import type {
  ApolloQueryResult,
  CreateMemoryInput,
  State,
} from '../../common/types';

import React from 'react';
import { gql, graphql } from 'react-apollo';
import { assoc, compose, pick, omit } from 'ramda';
import { connect } from 'react-redux';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import RecentMemories from '../profile/RecentMemories';
import { ViewMemories } from './ViewMemories';
import { addEdgeToFragment } from '../../common/helpers/graphqlUtils';
import { processFiles } from '../shared/fileUtils';

type Props = {
  currentBabyId: string,
  onSubmit: (input: CreateMemoryInput) => Promise<ApolloQueryResult<*>>,
  onAddVoiceNote: (id?: string) => void,
};

export const AddMemory = ({ onSubmit, onAddVoiceNote }: Props) =>
  <MemoryForm onSubmit={onSubmit} onAddVoiceNote={onAddVoiceNote} />;

export default compose(
  connect(({ babies }: State) => pick(['currentBabyId'], babies)),
  graphql(
    gql`
      mutation AddMemory($input: CreateMemoryInput!) {
        createMemory(input: $input) {
          edge {
            node {
              ...MemoryListItem
            }
          }
        }
      }
      ${Memory.fragments.item}
    `,
    {
      props: ({ mutate, ownProps: { currentBabyId } }) => ({
        onSubmit: async (values: CreateMemoryInput) => {
          const input = {
            ...values,
            babyId: currentBabyId,
            files: await processFiles(values.files),
          };

          // $FlowFixMe$
          return mutate({
            variables: {
              input: omit(['removeFiles'], input),
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
        },
      }),
    },
  ),
)(AddMemory);
