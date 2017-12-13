import { gql } from 'react-apollo';

export const babyForm = {
  form: gql`
    fragment BabyForm on Baby {
      id
      name
      gender
      dob
      weekBorn
      relationship
      weight
      height
      avatar {
        url
      }
      coverImage {
        url
      }
    }
  `,
};
