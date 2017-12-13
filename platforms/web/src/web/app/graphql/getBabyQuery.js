import { gql } from 'react-apollo';

export const getBabyQuery = gql`
  query getBaby($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        name
        avatar {
          url
        }
        coverImage {
          url
        }
        name
        weight
        height
      }
    }
  }
`;
