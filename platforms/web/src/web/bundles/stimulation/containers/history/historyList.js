// @flow
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import withCurrentBaby from 'web/components/withCurrentBaby';
import HistoryList from '../../components/history/HistoryList';
import { ActivityFragments } from '../../fragments/activity';

const query = gql`
    query ViewHistoryActivities($periodId: ID!) {
        viewer {
            allActivities(filter: { periodId: $periodId }) {
                edges {
                    node {
                        id
                        ...Activity
                    }
                }
            }
        }
    }
    ${ActivityFragments.activity}
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ match }) => ({
      variables: { periodId: [match.params.id] },
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'allActivities'], data),
    }),
  }),
  DisplayLoadingState,
)(HistoryList);
