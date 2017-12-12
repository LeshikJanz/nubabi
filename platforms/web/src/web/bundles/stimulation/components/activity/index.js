// @flow
import React from 'react';
import ActivityProfile from '../../containers/activity/activityProfile';
import ActivityExpert from './ActivityExpert';
import ActivityEquipment from '../equipment/ActivityEquipment';
import ActivitySkittles from './ActivitySkittles';
import ActivityStatus from '../../containers/activity/activityStatus';
import ActivitySwitcher from '../../containers/activity/activitySwitcher';
import * as ActivityStyled from '../../styled/activity';
import { ActivityConnection } from 'core/types';

type Props = {
  activity: ActivityConnection,
  history: { goBack: Function },
};

const Activity = ({ activity, history }: Props) => (
  <ActivityStyled.Wrapper>
    <ActivityStyled.BackButton onClick={history.goBack}>
      Back
    </ActivityStyled.BackButton>
    <ActivityProfile activity={activity} />
    <ActivityExpert {...activity} />
    <ActivityEquipment {...activity} />
    <ActivitySkittles {...activity} />
    <ActivityStatus activity={activity} />
    <ActivitySwitcher activity={activity} />
  </ActivityStyled.Wrapper>
);

export default Activity;
