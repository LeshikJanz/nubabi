// @flow
import type { Memory as MemoryType } from '../../common/types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import { isEmptyProp } from '../../common/helpers/graphqlUtils';
import Memory from './Memory';

type Props = {
  id: string,
  memory: MemoryType,
  currentBabyId: string,
  onEditMemory: (id: string) => void,
};

export const ViewMemory = ({ memory, currentBabyId, onEditMemory }: Props) => (
  <KeyboardAwareScrollView>
    <Memory babyId={currentBabyId} onEditMemory={onEditMemory} {...memory} />
  </KeyboardAwareScrollView>
);

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query Memory($id: ID!, $babyId: ID) {
        viewer {
          baby(id: $babyId) {
            id
            memory(id: $id) {
              ...MemoryItem
            }
          }
        }
      }
      ${Memory.fragments.detail}
    `,
    {
      options: ({ id, currentBabyId }) => ({
        variables: { id, babyId: currentBabyId },
        fetchPolicy: 'cache-and-network',
      }),
      props: ({ data }) => ({
        data,
        memory: path(['viewer', 'baby', 'memory'], data),
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(ViewMemory);
