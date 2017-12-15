// @flow
import React from 'react';
import ActivityButton from './ActivityButton';
import { ACTIVITY_BUTTONS } from '../../constants/index';
import * as ActivityMenuStyled from '../../styled/activity/ActivityMenuStyled';

type Props = {
  selectActivity: Function,
};

const ActivityMenu = ({ selectActivity }: Props) => (
  <ActivityMenuStyled.Buttons>
    {ACTIVITY_BUTTONS.map(a => (
      <ActivityButton
        key={a.id}
        handleActivity={() => selectActivity(a)}
        {...a}
      />
    ))}
  </ActivityMenuStyled.Buttons>
);

export default ActivityMenu;
