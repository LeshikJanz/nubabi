// @flow
/* eslint-disable no-underscore-dangle */
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
            isFavorite
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
          edge: {
            __typename: 'ActivityEdge',
            node: {
              __typename: 'Activity',
              id: input.id,
              isFavorite: input.favorite,
            },
          },
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
          if (!data.data.toggleActivityFavorite.edge.name) {
            // Optimistic response: add activity from fragment
            const activity = store.readFragment({
              fragment: ActivityList.fragments.activities,
              fragmentName: 'ActivityList',
              id: data.data.toggleActivityFavorite.__activityId,
            });

            // eslint-disable-next-line no-param-reassign
            data.data.toggleActivityFavorite.edge = {
              __typename: 'ActivityEdge',
              node: activity,
            };
          }
          try {
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
          } catch (err) {
            //
          }
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
