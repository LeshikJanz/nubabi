// @flow
import React from 'react';
import { ActivityConnection } from 'core/types';
import ActivityList from '../containers/activityList';
import * as FilteredStyled from '../styled/FilteredActivitiesStyled';

type Props = {
  activities: ActivityConnection[],
  loadMoreEntries: Function,
};

const FilteredActivities = ({ activities, loadMoreEntries }: Props) => (
  <FilteredStyled.Wrapper>
    <ActivityList activities={activities} onLoadMore={loadMoreEntries} />
  </FilteredStyled.Wrapper>
);

export default FilteredActivities;
