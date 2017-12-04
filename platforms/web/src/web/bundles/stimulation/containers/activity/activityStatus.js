import { gql, graphql } from 'react-apollo';
import { compose } from 'ramda';
import { ActivityFragments } from '../../fragments/activity';
import ActivityStatus from '../../components/activity/ActivityStatus';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';

const refetchQueries = ['ThisWeeksActivitiesList', 'Profile'];

export default compose(
  graphql(
    gql`
        mutation SwoopActivity($input: SwoopActivityInput!) {
            swoopActivity(input: $input) {
                newActivity {
                    ...Activity
                }
                oldActivityId
            }
        }
        ${ActivityFragments.activity}
    `,
    { name: 'swoopActivity', options: () => ({ refetchQueries }) },
  ),
  graphql(
    gql`
        mutation ChangeActivityLevel($input: AdjustActivityLevelInput!) {
            changeActivity(input: $input) {
                newActivity {
                    ...Activity
                }
                oldActivityId
            }
        }
        ${ActivityFragments.activity}
    `,
    { name: 'changeActivityLevel', options: () => ({ refetchQueries }) },
  ),
  graphql(
    gql`
      mutation CompleteActivity($input: CompleteActivityInput!) {
        completeActivity(input: $input) {
          edge {
            node {
              id
            }
          }
        }
      }
    `,
    {
      name: 'completeActivity',
      options: {
        fetchPolicy: 'network-only',
        refetchQueries: ['ThisWeeksActivitiesList'],
      },
    },
  ),
  withCurrentBaby,
  withRouter,
)(ActivityStatus);
