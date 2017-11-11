// @flow
import type { CommentConnection } from 'core/types';
import React, { PureComponent } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { compose, path, pick } from 'ramda';
import { gql, graphql } from 'react-apollo';
import pluralize from 'pluralize';
import { filter } from 'graphql-anywhere';
import { Box, Text } from '../components';
import MemoryComment from './MemoryComment';

type Props = {
  memoryId: string,
  babyId: string,
};

const keyExtractor = path(['node', 'id']);

export class MemoryComments extends PureComponent {
  props: Props;

  static fragments = {
    detail: gql`
      fragment MemoryComments on Memory {
        comments {
          count
          edges {
            node {
              ...MemoryComment
            }
          }
        }
      }
      ${MemoryComment.fragments.comment}
    `,
  };

  renderItem = ({ item }) => {
    return (
      <MemoryComment
        key={item.node.id}
        {...filter(MemoryComment.fragments.comment, item.node)}
      />
    );
  };

  render() {
    const { comments, loading } = this.props;

    if (loading || !comments) {
      return null;
    }

    // TODO: FlatList
    return (
      <FlatList
        data={comments}
        renderItem={this.renderItem}
        keyExtractor={keyExtractor}
      />
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
              ...MemoryComments
            }
          }
        }
      }
      ${MemoryComments.fragments.detail}
    `,
    {
      options: (ownProps: Props) => ({
        variables: pick(['babyId', 'memoryId'], ownProps),
      }),
      props: ({ data }) => {
        return {
          ...data,
          comments: path(
            ['viewer', 'baby', 'memory', 'comments', 'edges'],
            data,
          ),
        };
      },
    },
  ),
)(MemoryComments);
