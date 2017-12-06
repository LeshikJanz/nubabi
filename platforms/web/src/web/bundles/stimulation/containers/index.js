import Stimulation from '../components/index';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { FavoriteActivitiesFragment } from '../fragments/favorites';
import withCurrentBaby from 'web/components/withCurrentBaby';

const query = gql`
  query getBabyActivity($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        activities(first: 1000) {
          edges {
            node {
              id
              name
              introduction
              isCompleted
              isFavorite
              skillArea {
                id
                icon
                  name
                image {
                  thumb {
                    url
                  }
                }
              }
            }
          }
        }
          ...FavoriteActivities
      }
    }
  }

  ${FavoriteActivitiesFragment.favorites}
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'network-only',
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  DisplayLoadingState,
)(Stimulation);
