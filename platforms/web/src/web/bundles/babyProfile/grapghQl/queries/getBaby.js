import { gql } from 'react-apollo';
import { babyForm } from '../fragments/babyForm';

export const getBabyQuery = gql`
  query GetBaby($id: ID!) {
    viewer {
      baby(id: $id) {
        ...BabyForm
      }
    }
  }

  ${babyForm.form}
`;
