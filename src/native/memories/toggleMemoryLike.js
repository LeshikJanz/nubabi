// @flow
import { gql, graphql } from 'react-apollo';

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
      onToggleLike: (id, isLiked) =>
        mutate({
          variables: {
            input: {
              id,
              isLiked,
            },
          },
        }),
    }),
  },
);

export default toggleMemoryLike;
