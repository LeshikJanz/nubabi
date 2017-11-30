// @flow
import { gql, graphql } from 'react-apollo';
import { optimisticResponse } from 'core/helpers/graphqlUtils';

export const toggleMemoryLike = graphql(
  gql`
    mutation ToggleMemoryLike($input: ToggleMemoryLikeInput!) {
      toggleMemoryLike(input: $input) {
        edge {
          node {
            id
            isLikedByViewer
            likes {
              count
            }
          }
        }
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      onToggleLike: (id, isLiked, likeCount) =>
        mutate({
          variables: {
            input: {
              id,
              isLiked,
            },
          },
          optimisticResponse: optimisticResponse(
            'toggleMemoryLike',
            'ToggleMemoryLikePayload',
            {
              edge: {
                __typename: 'MemoryEdge',
                node: {
                  __typename: 'Memory',
                  id,
                  isLikedByViewer: isLiked,
                  likes: {
                    __typename: 'LikeConnection',
                    count: isLiked ? likeCount + 1 : likeCount - 1,
                  },
                },
              },
            },
          ),
        }),
    }),
  },
);

export default toggleMemoryLike;
