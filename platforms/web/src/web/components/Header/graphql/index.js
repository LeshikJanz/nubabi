import { gql } from 'react-apollo';

export const getBabiesQuery = gql`
  query getBabies {
    viewer {
      babies {
        count
        edges {
          node {
            id
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;
