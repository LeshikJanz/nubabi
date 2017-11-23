// @flow
import type { Memory as MemoryType } from 'core/types';
import React from 'react';
import { compose, merge, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import {
  displayLoadingState,
  showNoContentViewIf,
  withCurrentBaby,
} from '../components';
import { addEdgeToFragment, isEmptyProp } from 'core/helpers/graphqlUtils';
import MemoryDetail from './MemoryDetail';
import MemoryComments from './MemoryComments';
import toggleMemoryLike from './toggleMemoryLike';

type Props = {
  id: string,
  memory: MemoryType,
  currentBabyId: string,
  onToggleLike: Function, // TODO
  onAddComment: Function, // TODO
};

export const ViewMemory = ({
  memory,
  currentBabyId,
  onToggleLike,
  onAddComment,
}: Props) => (
  <MemoryDetail
    babyId={currentBabyId}
    onToggleMemoryLike={onToggleLike}
    onAddComment={onAddComment}
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
              ...MemoryDetail
            }
          }
        }
      }
      ${MemoryDetail.fragments.detail}
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
  graphql(
    gql`
      mutation AddCommentToMemory($input: CreateCommentInput!) {
        createComment(input: $input) {
          edge {
            cursor
            node {
              id
              createdAt
              text
              author {
                id
                firstName
                lastName
                avatar {
                  url
                }
              }
              commentable {
                ... on Node {
                  id
                }
                comments {
                  count
                }
              }
            }
          }
        }
      }
    `,
    {
      props: ({ mutate, ownProps: { id } }) => ({
        onAddComment: input => {
          // $FlowFixMe
          return mutate({
            variables: {
              input: merge(input, { id, commentableType: 'memory' }),
            },

            update: (store, data) => {
              /*
              if (!data.data.createComment.edge.node.author) {
                const author = getCurrentUserFromStore(gql, store);

                if (author) {
                  data.data.createComment.edge.node.author = author;
                }
              }
              */
              addEdgeToFragment(
                MemoryComments.fragments.detail,
                'createComment',
                ['comments'],
                id,
                'head',
              )(store, data);
            },

            /*
            // TODO:
            optimisticResponse: {
              __typename: 'Mutation',
              createComment: {
                __typename: 'CreateOrUpdateCommentPayload',
                edge: {
                  __typename: 'CommentEdge',
                  cursor: uuid.v4(),
                  node: {
                    __typename: 'Comment',
                    id: uuid.v4(),
                    text: input.text,
                    createdAt: new Date(),
                    commentable: {
                      __typename: 'Memory',
                      id,
                    }
                  },
                },
              },
            },
            */
          });
        },
      }),
    },
  ),
  showNoContentViewIf(isEmptyProp('memory')),
  displayLoadingState,
)(ViewMemory);
