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
import { ViewMemories } from './ViewMemories';
import { addEdgeToFragment } from '../shared/graphqlUtils';

type Props = {
  currentBabyId: string,
  onSubmit: (input: CreateMemoryInput) => Promise<ApolloQueryResult<*>>,
};

export const AddMemory = ({ onSubmit }: Props) =>
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
          // $FlowFixMe$
          return mutate({
            variables: {
              input: assoc('babyId', currentBabyId, input),
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
