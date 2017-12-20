import WeekActivities from '../components/WeekActivities';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import withCurrentBaby from 'web/components/withCurrentBaby';
import requireBaby from 'web/components/requireBaby';
import path from 'ramda/src/path';
import displayLoadingState from 'web/components/displayLoadingState';
import { ActivityListFragment } from '../fragments/activity';

const query = gql`
    query ThisWeeksActivitiesList($id: ID!) {
        viewer {
            baby(id: $id) {
                id
                activities {
                    edges {
                        cursor
                        node {
                            ...ActivityList
                            isCompleted
                        }
                    }
                }
            }
        }
    }
    ${ActivityListFragment.activities}
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'baby', 'activities', 'edges'], data),
    }),
  }),
  displayLoadingState,
  requireBaby,
)(WeekActivities);
