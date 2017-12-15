import { gql } from 'react-apollo';

export const updateUserMutation = gql`
  mutation UpdateUserProfile($input: UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        id
        firstName
        lastName
        dob
        avatar {
          url
        }
      }
    }
  }
`;
