// @flow
import React from 'react';
import { Baby } from 'core/types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import ActivityProfile from './ActivityProfile';
import ActivityExpert from './ActivityExpert';
import ActivityEquipment from '../equipment/ActivityEquipment';
import ActivitySkittles from './ActivitySkittles';
import ActivityStatus from './ActivityStatus';
import ActivitySwitcher from '../../containers/activity/activitySwitcher';

type Props = {
  baby: Baby,
};

const ActivityWrapper = styled(Flex)`
  flex-direction: column;
  margin: 50px 15px 0;
  height: 100%;
`;

const Activity = ({ baby }: Props) => {
  const { activity } = baby;

  return (
    <ActivityWrapper>
      <ActivityProfile activity={activity} />
      <ActivityExpert {...activity} />
      <ActivityEquipment {...activity} />
      <ActivitySkittles {...activity} />
      <ActivityStatus {...activity} />
      <ActivitySwitcher activity={activity} />
    </ActivityWrapper>
  );
};

export default Activity;
