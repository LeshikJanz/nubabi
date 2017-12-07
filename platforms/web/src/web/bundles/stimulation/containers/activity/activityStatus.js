import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import { ActivityFragments } from '../../fragments/activity';
import ActivityStatus from '../../components/activity/ActivityStatus';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';
import { path } from 'ramda';
import { optimisticResponse } from 'core/helpers/graphqlUtils';

const refetchQueries = ['ThisWeeksActivitiesList', 'ViewActivity'];

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
      options: () => ({
        optimisticResponse: optimisticResponse(
          'completeActivity',
          'CompleteActivityPayload',
          ({ input }) => ({
            edge: {
              __typename: 'ActivityEdge',
              node: {
                __typename: 'Activity',
                id: input.id,
                isCompleted: true,
              },
            },
          }),
        ),
        fetchPolicy: 'cache-and-network',
        refetchQueries: ['ThisWeeksActivitiesList'],
      }),
    },
  ),
  withCurrentBaby,
  withRouter,
  withHandlers({
    refreshActivity: ({ history }) => ({ data }) => {
      const newActivity =
        path(['swoopActivity', 'newActivity'], data) ||
        path(['changeActivity', 'newActivity'], data);

      if (newActivity) {
        history.push(`/stimulation/activity/${newActivity.id}`);
      }
    },
  }),
  withHandlers({
    handleActivity: ({
      refreshActivity,
      activity,
      currentBabyId,
      ...props
    }) => activityAction => {
      let input = {
        id: activity.id,
        babyId: currentBabyId,
      };

      if (activityAction.level) {
        input = { ...input, level: activityAction.level };
      }

      return props[activityAction.callback]({
        variables: { input },
      }).then(refreshActivity);
    },
  }),
)(ActivityStatus);
