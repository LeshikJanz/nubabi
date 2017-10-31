// @flow
import { gql, graphql } from 'react-apollo';
import { path } from 'ramda';
import {
  addEdgeToFragment,
  optimisticResponse,
  removeEdgeFromFragment,
} from '../../common/helpers/graphqlUtils';
import Favorites from './Favorites';
import ActivityList from './ActivityList';

export const toggleFavorite = graphql(
  gql`
    mutation ToggleFavorite($input: ToggleFavoriteInput!) {
      toggleActivityFavorite(input: $input) {
        edge {
          node {
            id
            ...ActivityList
          }
        }
        wasFavorited
      }
    }
    ${ActivityList.fragments.activities}
  `,
  {
    name: 'toggleFavorite',
    options: ({ currentBabyId: babyId }) => ({
      optimisticResponse: optimisticResponse(
        'toggleActivityFavorite',
        'ToggleFavoritePayload',
        ({ input }) => ({
          wasFavorited: input.favorite,
          __activityId: input.id,
        }),
      ),
      update: (store, data) => {
        if (!data.data.toggleActivityFavorite) {
          return;
        }

        const activityId =
          data.data.toggleActivityFavorite.__activityId ||
          data.data.toggleActivityFavorite.edge.node.id;

        const wasFavorited = path(
          ['data', 'toggleActivityFavorite', 'wasFavorited'],
          data,
        );

        if (wasFavorited) {
          if (!data.data.toggleActivityFavorite.edge) {
            // Optimistic response: add activity from fragment
            const activity = store.readFragment({
              fragment: ActivityList.fragments.activities,
              fragmentName: 'ActivityList',
              id: data.data.toggleActivityFavorite.__activityId,
            });

            data.data.toggleActivityFavorite.edge = {
              __typename: 'ActivityEdge',
              node: activity,
            };
          }

          addEdgeToFragment(
            Favorites.fragments.favorites,
            'toggleActivityFavorite',
            ['favoriteActivities'],
            babyId,
            'head',
            {
              fragmentName: 'FavoriteActivities',
            },
          )(store, data);
        } else {
          removeEdgeFromFragment(
            Favorites.fragments.favorites,
            activityId,
            babyId,
            ['favoriteActivities'],
            {
              fragmentName: 'FavoriteActivities',
            },
          )(store, data);
        }
      },
    }),
  },
);

export default toggleFavorite;
