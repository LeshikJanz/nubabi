import { gql } from 'react-apollo';

export const getCurrentUserQuery = gql`
  query user {
    viewer {
      user {
        id
        email
        firstName
        lastName
        dob
        linkedAccounts {
          pageInfo {
            hasNextPage
          }
        }
        totalAchievements
        totalMemories
        avatar {
          thumb {
            url
          }
          url
        }
      }
    }
  }
`;
