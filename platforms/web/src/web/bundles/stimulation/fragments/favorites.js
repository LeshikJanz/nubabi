import { gql } from 'react-apollo';
import { ActivityListFragment } from './activity';

export const FavoriteActivitiesFragment = {
  favorites: gql`
      fragment FavoriteActivities on Baby {
          favoriteActivities {
              edges {
                  node {
                      ...ActivityList
                  }
              }
          }
      }
      ${ActivityListFragment.activities}
  `,
};
