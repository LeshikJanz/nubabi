import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';
import ActivityProfile from '../../components/activity/ActivityProfile';

const refetchQueries = ['ThisWeeksActivitiesList', 'Profile'];

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
        fetchPolicy: 'network-only',
        refetchQueries,
      }),
      // props: ({ mutate }) => ({
      //   submit({ input }) {
      //     return mutate({
      //       variables: { input },
      //       optimisticResponse: {
      //         __typename: 'Mutation',
      //         toggleActivityFavorite: {
      //           id: input.id,
      //           __typename: 'Comment',
      //           isFavorite: input.favorite
      //         },
      //       },
      //     });
      //   }
      // }),
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
