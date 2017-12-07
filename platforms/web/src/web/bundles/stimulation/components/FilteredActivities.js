// @flow
import React from 'react';
import { ActivityConnection } from 'core/types';
import ActivityList from '../containers/activityList';
import * as FilteredStyled from '../styled/FilteredActivitiesStyled';

type Props = {
  activities: ActivityConnection[],
};

const FilteredActivities = ({ activities }: Props) => (
  <FilteredStyled.Wrapper>
    <ActivityList activities={activities.edges} />
  </FilteredStyled.Wrapper>
);

export default FilteredActivities;
