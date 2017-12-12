// @flow
import { gql, graphql } from 'react-apollo';
import { compose, withProps } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import withCurrentBaby from 'web/components/withCurrentBaby';
import HistoryList from '../../components/history/HistoryList';
import { ActivityListFragment } from '../../fragments/activity';
import { ActivityHistory } from '../../fragments/history';
import { withRouter } from 'react-router-dom';

const query = gql`
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
  withRouter,
  graphql(query, {
    options: ({ currentBabyId, match }) => ({
      variables: {
        babyId: currentBabyId,
        periodId: [match.params.id],
      },
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'baby', 'activities'], data),
      history: path(['viewer', 'baby', 'activityHistory'], data),
    }),
  }),
  withProps(({ history, match }) => ({
    activeHistory:
      history &&
      history.edges.find(({ node }) => node.id === match.params.id).node,
  })),
  DisplayLoadingState,
)(HistoryList);
