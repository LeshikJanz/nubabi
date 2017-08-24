// @flow
import type { CommentConnection } from '../../common/types';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { compose, pick, pathOr } from 'ramda';
import { graphql, gql } from 'react-apollo';
import pluralize from 'pluralize';
import { filter } from 'graphql-anywhere';
import { Box, Text } from '../components';
import MemoryComment from './MemoryComment';

type Props = {
  comments: CommentConnection,
  expanded: boolean,
  onLoadMore: () => void,
};

export class MemoryComments extends PureComponent {
  props: Props;

  render() {
    const { comments, expanded, onLoadMore } = this.props;

    const shouldDisplayIndicator =
      comments.count > comments.edges.length && !expanded;
    const commentDiff = comments.count - comments.edges.length;

    return (
      <Box
        borderTopWidth={1}
        padding={0}
        style={() => ({ borderColor: '#E9ECF4' })}
      >
        {comments.edges.map(edge =>
          <MemoryComment
            key={edge.node.id}
            {...filter(MemoryComment.fragments.comment, edge.node)}
          />,
        )}

        {shouldDisplayIndicator &&
          <Box as={TouchableOpacity} onPress={onLoadMore} contentSpacing>
            <Text>
              +{commentDiff} more {pluralize('comment', commentDiff)}
            </Text>
          </Box>}

        <Box
          contentSpacing
          borderTopWidth={1}
          style={() => ({ borderColor: '#E9ECF4' })}
        >
          <Text color="secondary">Add Comment</Text>
        </Box>
      </Box>
    );
  }
}

export default compose(
  graphql(
    gql`
    query MemoryComments($babyId: ID, $memoryId: ID!) {
      viewer {
        baby(id: $babyId) {
          id
          memory(id: $memoryId) {
            id
            comments {
              count
              edges {
                node {
                  id
                  ...MemoryComment
                }
              }
            }
          }
        }
      }
    }
    ${MemoryComment.fragments.comment}
  `,
    {
      options: (ownProps: Props) => ({
        skip: !ownProps.expanded,
        variables: pick(['babyId', 'memoryId'], ownProps),
      }),
      props: ({ data, ownProps: { comments: previousComments } }) => {
        return {
          ...data,
          comments: pathOr(
            previousComments,
            ['viewer', 'baby', 'memory', 'comments'],
            data,
          ),
        };
      },
    },
  ),
)(MemoryComments);
