// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityList from '../containers/ActivityList';
import * as FavoritesStyled from '../styled/FavoritesStyled';

type Props = {
  favoriteActivities: ActivityConnection[],
  location: { pathname: string },
};

const Favorites = ({ favoriteActivities, location: { pathname } }: Props) => (
  <FavoritesStyled.Wrapper>
    <FavoritesStyled.ListHeader justify="space-between" align="center">
      <FavoritesStyled.ListTitle>Favorite Activities</FavoritesStyled.ListTitle>
    </FavoritesStyled.ListHeader>

    <ActivityList
      activities={favoriteActivities}
      backLink={pathname}
      backLinkName="Back to Favorites"
    />
  </FavoritesStyled.Wrapper>
);

export default Favorites;
