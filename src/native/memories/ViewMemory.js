// @flow
import type { Memory as MemoryType } from '../../common/types';
import React from 'react';
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
import MemoryDetail from './MemoryDetail';
import toggleMemoryLike from './toggleMemoryLike';

type Props = {
  id: string,
  memory: MemoryType,
  currentBabyId: string,
  onToggleLike: Function, // TODO
};

export const ViewMemory = ({ memory, currentBabyId, onToggleLike }: Props) => (
  <MemoryDetail
    babyId={currentBabyId}
    onToggleMemoryLike={onToggleLike}
    {...memory}
  />
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
  toggleMemoryLike,
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(ViewMemory);
