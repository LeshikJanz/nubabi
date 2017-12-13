import { gql } from 'react-apollo';
import { babyForm } from './babyForm';

export const createBaby = gql`
    mutation CreateBaby($input: CreateBabyInput!) {
        createBaby(input: $input) {
            createdBaby {
                ...BabyForm
            }
        }
    }

    ${babyForm.form}
`;
