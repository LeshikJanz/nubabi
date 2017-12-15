// @flow
import React from 'react';
import ActivityList from '../containers/activityList';
import type { ActivityConnection } from 'core/types';
import * as FavoritesStyled from '../styled/FavoritesStyled';

type Props = {
  favoriteActivities: ActivityConnection[],
};

const Favorites = ({ favoriteActivities }: Props) => (
  <FavoritesStyled.Wrapper>
    <FavoritesStyled.ListHeader justify="space-between" align="center">
      <FavoritesStyled.ListTitle>Favorite Activities</FavoritesStyled.ListTitle>
    </FavoritesStyled.ListHeader>

    <ActivityList activities={favoriteActivities.edges} />
  </FavoritesStyled.Wrapper>
);

export default Favorites;
