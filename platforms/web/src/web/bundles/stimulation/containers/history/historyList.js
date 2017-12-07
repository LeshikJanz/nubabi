// @flow
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import withCurrentBaby from 'web/components/withCurrentBaby';
import HistoryList from '../../components/history/HistoryList';
import { ActivityListFragment } from '../../fragments/favorites';
import { ActivityHistory } from '../../fragments/history';

const queryy = gql`
    query ActivityHistoryDetail($periodId: ID!, $babyId: ID!) {
        viewer {
            baby(id: $babyId) {
                id
                activities(filter: { periodId: $periodId }) {
                    edges {
                        node {
                            ...ActivityList
                        }
                    }
                }
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
    ${ActivityListFragment.activities}
    ${ActivityHistory.item}
`;

export default compose(
  withCurrentBaby,
  graphql(queryy, {
    options: ({ currentBabyId, match }) => ({
      variables: {
        babyId: currentBabyId,
        periodId: [match.params.id],
      },
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'baby', 'activities'], data),
    }),
  }),
  DisplayLoadingState,
)(HistoryList);
