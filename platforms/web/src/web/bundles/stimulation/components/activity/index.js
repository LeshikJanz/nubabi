// @flow
import React from 'react';
import { Baby } from 'core/types';
import ActivityProfile from '../../containers/activity/activityProfile';
import ActivityExpert from './ActivityExpert';
import ActivityEquipment from '../equipment/ActivityEquipment';
import ActivitySkittles from './ActivitySkittles';
import ActivityStatus from '../../containers/activity/activityStatus';
import ActivitySwitcher from '../../containers/activity/activitySwitcher';
import * as ActivityStyled from '../../styled/activity/indexStyled';

type Props = {
  baby: Baby,
  refetch: Function,
};

const Activity = ({ baby, refetch }: Props) => {
  const { activity } = baby;

  return (
    <ActivityStyled.Wrapper>
      <ActivityProfile activity={activity} />
      <ActivityExpert {...activity} />
      <ActivityEquipment {...activity} />
      <ActivitySkittles {...activity} />
      <ActivityStatus activity={activity} refetch={refetch} />
      <ActivitySwitcher activity={activity} />
    </ActivityStyled.Wrapper>
  );
};

export default Activity;
