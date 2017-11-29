import { gql } from 'react-apollo';

export const activityListFragment = {
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

export const favoriteActivitiesFragment = {
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
      ${activityListFragment.activities}
  `,
};
