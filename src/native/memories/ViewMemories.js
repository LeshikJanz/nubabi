// @flow
import type { Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import { isEmptyProp, mapEdgesToProp } from '../../common/helpers/graphqlUtils';
import MemoryList from './MemoryList';
import Memory from './Memory';

type Props = {
  memories: Array<MemoryType>,
  currentBabyId: string,
  onEditMemory: (id: string) => void,
};

export class ViewMemories extends PureComponent {
  props: Props;

  static fragments = {
    list: gql`
      fragment Memories on Baby {
        memories {
          edges {
            node {
              id
              ...MemoryItem
            }
          }
        }
      }
      ${Memory.fragments.detail}
    `,
  };

  render() {
    return (
      <MemoryList
        babyId={this.props.currentBabyId}
        memories={this.props.memories}
        onEditMemory={this.props.onEditMemory}
        onRefresh={this.props.data.refetch}
      />
    );
  }
}

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query ViewMemories($babyId: ID) {
        viewer {
          baby(id: $babyId) {
            id
            ...Memories
          }
        }
      }
      ${ViewMemories.fragments.list}

    `,
    {
      options: ({ currentBabyId }) => ({
        variables: { babyId: currentBabyId },
        fetchPolicy: 'cache-and-network',
      }),
      props: mapEdgesToProp('viewer.baby.memories', 'memories'),
    },
  ),
  showNoContentViewIf(isEmptyProp('memories')),
  displayLoadingState,
)(ViewMemories);
