// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import GrossIcon from 'web/assets/images/icons/gross-icon.svg';
import ActivityMenu from '../../containers/activity/activityMenu';
import * as ActivityStatusStyled from '../../styled/activity/ActivityStatusStyled';

type Props = {
  activity: ActivityConnection,
  handleActivity: Function,
  handleMenu: Function,
};

const ActivityStatus = ({ activity, handleActivity, handleMenu }: Props) => (
  <ActivityStatusStyled.Wrapper>
    <ActivityStatusStyled.IconWrapper>
      <GrossIcon />
    </ActivityStatusStyled.IconWrapper>
    <ActivityStatusStyled.Content>
      <ActivityStatusStyled.SkittlesName>
        Skittles
      </ActivityStatusStyled.SkittlesName>
      <ActivityStatusStyled.Text>
        Adjust the level of activity for Charlotte:
      </ActivityStatusStyled.Text>
    </ActivityStatusStyled.Content>

    <ActivityMenu
      handlActivityMenu={handleMenu}
      handleActivity={handleActivity}
      isCompleted={activity.isCompleted}
    />
  </ActivityStatusStyled.Wrapper>
);

export default ActivityStatus;
