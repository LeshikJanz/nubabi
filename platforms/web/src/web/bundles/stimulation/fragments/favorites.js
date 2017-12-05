import { gql } from 'react-apollo';

export const ActivityListFragment = {
  activities: gql`
    fragment ActivityList on Activity {
      id
      name
      skillArea {
        id
        name
        image {
          thumb {
            url
          }
        }
        icon
        completedIcon
      }
      equipment
      isCompleted
    }
  `,
};

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
