import WeekActivities from '../components/WeekActivities';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import { ActivityListFragment } from '../fragments/activity';
import withCurrentBaby from 'web/components/withCurrentBaby';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';

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
  DisplayLoadingState,
)(WeekActivities);
