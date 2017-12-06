// @flow
import React from 'react';
import styled from 'styled-components';
import { ActivityConnection } from 'core/types';
import ActivityList from './ActivityList';

type Props = {
  activities: ActivityConnection[],
};

const Wrapper = styled.div`
  padding: 15px;
`;

const FilteredActivities = ({ activities }: Props) => (
  <Wrapper>
    <ActivityList activities={activities.edges} />
  </Wrapper>
);

export default FilteredActivities;
