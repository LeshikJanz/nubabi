// @flow
import React from 'react';
import { Baby } from 'core/types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import ActivityProfile from './activityProfile';
import ActivityExpert from './activityExpert';
import ActivityEquipment from './activityEquipment';
import ActivitySkittles from './activitySkittles';

type Props = {
  baby: Baby,
};

const ActivityWrapper = styled(Flex)`
  flex-direction: column;
  background-color: #fff;
  margin: 50px 15px;
  height: 100%;
`;

const Activity = ({ baby: { activity = {} } }: Props) => {
  console.log('activity');
  console.log(activity);

  return (
    <ActivityWrapper>
      <ActivityProfile activity={activity} />
      <ActivityExpert {...activity} />
      <ActivityEquipment {...activity} />
      <ActivitySkittles {...activity} />
    </ActivityWrapper>
  );
};

export default Activity;
