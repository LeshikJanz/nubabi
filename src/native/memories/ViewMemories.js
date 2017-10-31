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
import toggleMemoryLike from './toggleMemoryLike';

type Props = {
  memories: Array<MemoryType>,
  currentBabyId: string,
  onViewMemory: (id: string) => void,
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
        onViewMemory={this.props.onViewMemory}
        onToggleLikeMemory={this.props.onToggleLike}
        onEditMemory={this.props.onEditMemory}
        onRefresh={this.props.data.refetch}
      />
    );
  }
}

export default compose(toggleMemoryLike)(ViewMemories);
