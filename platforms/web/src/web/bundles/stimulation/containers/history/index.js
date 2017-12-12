import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { ActivityHistory } from '../../fragments/history';
import History from '../../components/history';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';

const query = gql`
    query ActivityHistory($babyId: ID!) {
        viewer {
            baby(id: $babyId) {
                id
                activityHistory {
                    edges {
                        node {
                            ...ActivityHistoryItem
                        }
                    }
                }
            }
        }
    }
    ${ActivityHistory.item}
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ currentBabyId }) => ({
      variables: { babyId: currentBabyId },
    }),
    props: ({ data }) => ({
      data,
      activityHistory: path(['viewer', 'baby', 'activityHistory'], data),
    }),
  }),
  withRouter,
  withHandlers({
    handleHistory: ({ history }) => id => history.push(`/history/${id}`),
  }),
  DisplayLoadingState,
)(History);
