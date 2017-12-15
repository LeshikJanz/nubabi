import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';
import ActivityProfile from '../../components/activity/ActivityProfile';
import { optimisticResponse } from 'core/helpers/graphqlUtils';

export default compose(
  graphql(
    gql`
      mutation ToogleActivityFavorite($input: ToggleFavoriteInput!) {
        toggleActivityFavorite(input: $input) {
          edge {
            node {
              id
              isFavorite
            }
          }
        }
      }
    `,
    {
      name: 'toggleFavorite',
      options: () => ({
        fetchPolicy: 'cache-and-network',
        optimisticResponse: optimisticResponse(
          'toggleActivityFavorite',
          'ToggleFavoritePayload',
          ({ input }) => ({
            wasFavorited: input.favorite,
            __activityId: input.id,
            edge: {
              __typename: 'ActivityEdge',
              node: {
                __typename: 'Activity',
                id: input.id,
                isFavorite: input.favorite,
              },
            },
          }),
        ),
      }),
    },
  ),
  withCurrentBaby,
  withRouter,
  withHandlers({
    handlePrint: () => () => null,
    refreshFavoriteActivity: () => ({ data }) => data,
  }),
  withCurrentBaby,
  withHandlers({
    handleFavorite: ({
      activity,
      currentBabyId,
      toggleFavorite,
      refreshFavoriteActivity,
    }) => () => {
      const input = {
        id: activity.id,
        babyId: currentBabyId,
        favorite: !activity.isFavorite,
      };

      return toggleFavorite({
        variables: {
          input,
        },
      }).then(refreshFavoriteActivity);
    },
  }),
)(ActivityProfile);
