import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import displayLoadingState from 'web/components/displayLoadingState';
import requireBaby from 'web/components/requireBaby';
import { FavoriteActivitiesFragment } from '../fragments/favorites';
import Favorites from '../components/Favorites';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';

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
  withCurrentBaby,
  withRouter,
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'network-only',
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      favoriteActivities: path(
        ['viewer', 'baby', 'favoriteActivities', 'edges'],
        data,
      ),
    }),
  }),
  displayLoadingState,
  requireBaby,
)(Favorites);
