import Favorities from '../components/Favorites';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { favoriteActivitiesFragment } from '../fragments/favorites';

const query = gql`
    query FavoriteActivitiesList($id: ID!) {
        viewer {
            baby(id: $id) {
                id
                ...FavoriteActivities
            }
        }
    }

    ${favoriteActivitiesFragment.favorites}
`;

export default compose(
  connect(({ babies }) => ({
    currentBabyId: babies.currentBabyId,
  })),
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
  DisplayLoadingState,
)(Favorities);
