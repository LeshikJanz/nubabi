// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityProfile from '../../containers/activity/ActivityProfile';
import ActivityExpert from './ActivityExpert';
import ActivityEquipment from '../equipment/ActivityEquipment';
import ActivitySkittles from './ActivitySkittles';
import ActivityStatus from '../../containers/activity/ActivityStatus';
import ActivitySwitcher from '../../containers/activity/ActivitySwitcher';
import * as ActivityStyled from '../../styled/activity';
import { BackButton } from 'web/components';

type Props = {
  activity: ActivityConnection,
  handleBackRedirect: Function,
  isSwitchable: boolean,
  backLinkName: string,
};

const Activity = ({
  activity,
  handleBackRedirect,
  isSwitchable,
  backLinkName,
}: Props) => (
  <ActivityStyled.Wrapper>
    <ActivityStyled.BackButton>
      <BackButton name={backLinkName} handleClick={handleBackRedirect} />
    </ActivityStyled.BackButton>
    <ActivityProfile activity={activity} />
    <ActivityExpert {...activity} />
    <ActivityEquipment {...activity} />
    <ActivitySkittles {...activity} />
    {isSwitchable && (
      <div>
        <ActivityStatus activity={activity} />
        <ActivitySwitcher activity={activity} />
      </div>
    )}
  </ActivityStyled.Wrapper>
);

export default Activity;
