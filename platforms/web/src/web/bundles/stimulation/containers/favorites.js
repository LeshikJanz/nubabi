import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { FavoriteActivitiesFragment } from '../fragments/favorites';
import Favorites from '../components/Favorites';

const query = gql`
    query getBabyActivity($id: ID!) {
        viewer {
            baby(id: $id) {
                id
                ...FavoriteActivities
            }
        }
    }

    ${FavoriteActivitiesFragment.favorites}
`;

export default compose(
  connect(({ babies, settings }) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'network-only',
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      favoriteActivities: path(['viewer', 'baby', 'favoriteActivities'], data),
    }),
  }),
  DisplayLoadingState,
)(Favorites);
