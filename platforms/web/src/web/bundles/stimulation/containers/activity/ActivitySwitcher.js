import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import ActivitySwitcher from '../../components/activity/ActivitySwitcher';
import { ActivityFragments } from '../../fragments/activity';
import withCurrentBaby from 'web/components/withCurrentBaby';

const query = gql`
  query getBabyActivity($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        activities(first: 1000) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const refetchQueries = ['ThisWeeksActivitiesList', 'Profile'];

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ currentBabyId }) => ({
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
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
        refetchQueries: ['ThisWeeksActivitiesList'],
      },
    },
  ),
  DisplayLoadingState,
)(ActivitySwitcher);
