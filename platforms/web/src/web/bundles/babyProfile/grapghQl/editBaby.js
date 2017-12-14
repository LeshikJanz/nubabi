import { gql } from 'react-apollo';
import { babyForm } from './babyForm';

export const editBaby = gql`
    query EditBaby($id: ID!) {
        viewer {
            baby(id: $id) {
                ...BabyForm
            }
        }
    }

    ${babyForm.form}
`;
