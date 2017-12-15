// @flow
import React from 'react';
import ActivityButton from './ActivityButton';
import { ACTIVITY_BUTTONS } from '../../constants/index';
import FinishedActivityButton from './FinishedActivityButton';
import * as ActivityMenuStyled from '../../styled/activity/ActivityMenuStyled';

type Props = {
  selectActivity: Function,
  handleActivityMenu: Function,
  isCompleted: boolean,
  isActivityMenuOpen: boolean,
};

const ActivityMenu = ({
  selectActivity,
  handleActivityMenu,
  isCompleted,
  isActivityMenuOpen,
}: Props) => (
  <ActivityMenuStyled.Buttons>
    {((!isCompleted || isActivityMenuOpen) &&
      ACTIVITY_BUTTONS.map(a => (
        <ActivityButton
          key={a.id}
          handleActivity={() => selectActivity(a)}
          {...a}
        />
      ))) || <FinishedActivityButton handleMenu={handleActivityMenu} />}
  </ActivityMenuStyled.Buttons>
);

export default ActivityMenu;
