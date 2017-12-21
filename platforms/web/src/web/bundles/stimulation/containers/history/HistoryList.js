// @flow
import { gql, graphql } from 'react-apollo';
import { compose, withProps } from 'recompose';
import path from 'ramda/src/path';
import { withRouter } from 'react-router-dom';
import displayLoadingState from 'web/components/displayLoadingState';
import withCurrentBaby from 'web/components/withCurrentBaby';
import HistoryList from '../../components/history/HistoryList';
import { ActivityListFragment } from '../../fragments/activity';
import { ActivityHistory } from '../../fragments/history';
import moment from 'moment';

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
      activities: path(['viewer', 'baby', 'activities', 'edges'], data),
      history: path(['viewer', 'baby', 'activityHistory', 'edges'], data),
    }),
  }),
  withProps(({ history, match }) => ({
    activeHistory:
      history && history.find(({ node }) => node.id === match.params.id).node,
  })),
  withProps(({ activeHistory }) => ({
    timeStamp: `${moment(activeHistory.startDate).format('DD MMMM')} - ${moment(
      activeHistory.endDate,
    ).format('DD MMMM YYYY')}`,
  })),
  displayLoadingState,
)(HistoryList);
