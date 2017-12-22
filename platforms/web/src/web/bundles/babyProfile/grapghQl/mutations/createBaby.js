import { gql } from 'react-apollo';
import { babyForm } from '../fragments/babyForm';

export const createBaby = gql`
  mutation CreateBaby($input: CreateBabyInput!) {
    createBaby(input: $input) {
      edge {
        node {
          ...BabyForm
        }
      }
    }
  }

  ${babyForm.form}
`;
