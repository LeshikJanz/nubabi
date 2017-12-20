import { gql, graphql } from 'react-apollo';
import { compose, withProps, withHandlers } from 'recompose';
import path from 'ramda/src/path';
import displayLoadingState from 'web/components/displayLoadingState';
import requireBaby from 'web/components/requireBaby';
import ActivitySwitcher from '../../components/activity/ActivitySwitcher';
import { ActivityFragments } from '../../fragments/activity';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';

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
    { name: 'swoopActivity', options: { refetchQueries } },
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
    { name: 'changeActivityLevel', options: { refetchQueries } },
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
  withRouter,
  withProps(
    ({ baby, activity }) =>
      baby && {
        curActivityIndex: baby.activities.edges.findIndex(
          ({ node }) => node.id === activity.id,
        ),
      },
  ),
  withProps(
    ({ baby, curActivityIndex }) =>
      baby && {
        prevActivity: (baby.activities.edges[curActivityIndex - 1] &&
          baby.activities.edges[curActivityIndex - 1].node) || {
          id: '',
          name: 'Return to list',
        },
        nextActivity: (baby.activities.edges[curActivityIndex + 1] &&
          baby.activities.edges[curActivityIndex + 1].node) || {
          id: '',
          name: 'Return to list',
        },
      },
  ),
  withHandlers({
    handleRedirect: ({ history }) => id => {
      if (id) {
        history.push(`/activity/${id}`);
      } else {
        // Redirect to the full Activity list for edge elements
        history.push('/stimulation/weeks');
      }
      window.scrollTo(0, 0);
    },
  }),
  displayLoadingState,
  requireBaby,
)(ActivitySwitcher);
