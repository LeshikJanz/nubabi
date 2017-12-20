import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { optimisticResponse } from 'core/helpers/graphqlUtils';
import ActivityProfile from '../../components/activity/ActivityProfile';

export default compose(
  withCurrentBaby,
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
      options: {
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
      },
    },
  ),
  withHandlers({
    handlePrint: () => () => null,
    handleFavorite: ({ activity, currentBabyId, toggleFavorite }) => () => {
      const input = {
        id: activity.id,
        babyId: currentBabyId,
        favorite: !activity.isFavorite,
      };

      return toggleFavorite({
        variables: {
          input,
        },
      });
    },
  }),
)(ActivityProfile);
