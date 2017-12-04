import { gql, graphql } from 'react-apollo';
import { compose, withState, lifecycle, withHandlers } from 'recompose';
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
    { name: 'toggleFavorite', options: () => ({ refetchQueries }) },
  ),
  withCurrentBaby,
  withRouter,
  withState('isFavorite', 'setFavorite', false),
  withHandlers({
    handlePrint: () => () => null,
    refreshFavoriteActivity: () => ({ data }) => data,
  }),
  withCurrentBaby,
  withHandlers({
    handleFavorite: ({
      isFavorite,
      setFavorite,
      activity,
      currentBabyId,
      toggleFavorite,
      refreshFavoriteActivity,
    }) => () => {
      setFavorite(!isFavorite);

      const input = {
        id: activity.id,
        babyId: currentBabyId,
        favorite: !isFavorite,
      };

      return toggleFavorite({
        variables: {
          input,
        },
      }).then(refreshFavoriteActivity);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.setFavorite(!this.props.activity.isFavorite);
    },
  }),
)(ActivityProfile);
