// @flow
import type {
  ApolloQueryResult,
  GraphQLDataProp,
  Memory as MemoryType,
} from '../../common/types';
import React, { PureComponent } from 'react';
import { compose } from 'ramda';
import { gql } from 'react-apollo';
import MemoryList from './MemoryList';
import Memory from './Memory';
import toggleMemoryLike from './toggleMemoryLike';

type Props = {
  memories: Array<MemoryType>,
  currentBabyId: string,
  onViewMemory: (id: string) => void,
  onEditMemory: (id: string) => void,
  onToggleLike: (
    id: string,
    isLiked: boolean,
    likeCount: number,
  ) => Promise<ApolloQueryResult<*>>,
} & GraphQLDataProp<*>;

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
