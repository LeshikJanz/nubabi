// @flow
import React from 'react';
import GrossIcon from 'web/assets/images/icons/gross-icon.svg';
import ActivityMenu from '../../containers/activity/activityMenu';
import { ActivityConnection } from 'core/types';
import * as ActivityStatusStyled from '../../styled/activity/ActivityStatusStyled';

type Props = {
  activity: ActivityConnection,
  handleActivity: Function,
};

const ActivityStatus = ({ activity, handleActivity }: Props) => (
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
      handleActivity={handleActivity}
      isCompleted={activity.isCompleted}
    />
  </ActivityStatusStyled.Wrapper>
);

export default ActivityStatus;
