// @flow
import type {
  ApolloQueryResult,
  CreateMemoryInput,
  State,
} from '../../common/types';

import React from 'react';
import { gql, graphql } from 'react-apollo';
import { assoc, compose, pick } from 'ramda';
import { connect } from 'react-redux';
import MemoryForm from './MemoryForm';
import Memory from './Memory';
import RecentMemories from '../profile/RecentMemories';
import { addEdgeToFragment } from '../shared/graphqlUtils';

type Props = {
  currentBabyId: string,
  onSubmit: (input: CreateMemoryInput) => Promise<ApolloQueryResult<*>>,
};

export const AddMemory = ({ onSubmit, ...other }: Props) =>
  <MemoryForm onSubmit={onSubmit} initialValues={{ title: 'Some' }} />;

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
        onSubmit: (input: CreateMemoryInput) => {
          return mutate({
            variables: {
              input: assoc('babyId', currentBabyId, input),
            },
            update: addEdgeToFragment(
              RecentMemories.fragments.memories,
              'createMemory',
              ['memories'],
              currentBabyId,
              'head',
            ),
          });
        },
      }),
    },
  ),
)(AddMemory);
