// @flow
import type { State, Memory as MemoryType } from '../../common/types';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { displayLoadingState, showNoContentViewIf } from '../components';
import { isEmptyProp, mapEdgesToProp } from '../shared/graphqlUtils';
import MemoryList from './MemoryList';
import Memory from './Memory';

type Props = {
  memories: Array<MemoryType>,
};

export class ViewMemories extends PureComponent {
  props: Props;

  render() {
    return (
      <MemoryList
        babyId={this.props.currentBabyId}
        memories={this.props.memories}
      />
    );
  }
}

export default compose(
  connect(({ babies }: State) => ({
    currentBabyId: babies.currentBabyId,
  })),
  graphql(
    gql`
    query ViewMemories($babyId: ID) {
      viewer {
        baby(id: $babyId) {
          id
          memories {
            edges {
              node {
                id
                ...MemoryItem
              }
            }
          }
        }
      }
    }
    ${Memory.fragments.detail}
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
