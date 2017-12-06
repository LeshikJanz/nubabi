import { gql } from 'react-apollo';

export const ActivityHistory = {
  item: gql`
    fragment ActivityHistoryItem on ActivityHistory {
      id
      startDate
      endDate
    }
  `,
};
