// @flow
import React from 'react';
import { Baby } from 'core/types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import ActivityProfile from './acitivityProfile';

type Props = {
  baby: Baby,
};

const ActivityWrapper = styled(Flex)``;

const Activity = ({ baby: { activity = {} } }: Props) => {
  console.log('activity');
  console.log(activity);

  return (
    <ActivityWrapper>
      <ActivityProfile activity={activity} />
      <h1>Hello</h1>
    </ActivityWrapper>
  );
};

export default Activity;
