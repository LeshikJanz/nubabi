import { gql } from 'react-apollo';
import { babyForm } from '../fragments/babyForm';

export const updateBaby = gql`
  mutation UpdateBaby($input: UpdateBabyInput!) {
    updateBaby(input: $input) {
      edge {
        node {
          ...BabyForm
        }
      }
    }
  }

  ${babyForm.form}
`;
