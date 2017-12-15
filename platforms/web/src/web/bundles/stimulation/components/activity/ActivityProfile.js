// @flow
import React from 'react';
import type { ActivityConnection } from 'core/types';
import FavoriteIcon from 'web/assets/images/icons/favorite.svg';
import SeparatorIcon from 'web/assets/images/icons/separator.svg';
import PrintIcon from 'web/assets/images/icons/print.svg';
import { Button } from 'web/elements';
import * as ActivityProfileStyled from '../../styled/activity/ActivityProfileStyled';

type Props = {
  activity: ActivityConnection,
  handleFavorite: Function,
  handlePrint: Function,
};

const ActivityProfile = ({ activity, handleFavorite, handlePrint }: Props) => (
  <ActivityProfileStyled.Wrapper>
    <ActivityProfileStyled.ImageContainer>
      <ActivityProfileStyled.Backdrop />
      <ActivityProfileStyled.Image src={activity.skillArea.image.large.url} />
    </ActivityProfileStyled.ImageContainer>
    <ActivityProfileStyled.MainLabels>
      <ActivityProfileStyled.Label>{activity.name}</ActivityProfileStyled.Label>
      <Button type="button">{activity.skillArea.name}</Button>
    </ActivityProfileStyled.MainLabels>
    <ActivityProfileStyled.Actions isfavorite={`${activity.isFavorite}`}>
      <FavoriteIcon onClick={handleFavorite} />
      <SeparatorIcon />
      <PrintIcon onClick={handlePrint} />
    </ActivityProfileStyled.Actions>
  </ActivityProfileStyled.Wrapper>
);

export default ActivityProfile;
