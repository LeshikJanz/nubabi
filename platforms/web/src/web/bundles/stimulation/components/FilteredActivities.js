// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityList from '../containers/ActivityList';
import * as FilteredStyled from '../styled/FilteredActivitiesStyled';
import * as ActivitiesStyled from '../styled/ActivitiesStyled';

type Props = {
  activities: ActivityConnection[],
  loadMoreEntries: Function,
  categoryName: string,
};

const FilteredActivities = ({
  activities,
  loadMoreEntries,
  categoryName,
}: Props) => (
  <FilteredStyled.Wrapper>
    <ActivitiesStyled.ListHeader justify="space-between" align="center">
      <ActivitiesStyled.ListTitle is="h3">
        {categoryName}
      </ActivitiesStyled.ListTitle>
    </ActivitiesStyled.ListHeader>

    <ActivityList activities={activities} onLoadMore={loadMoreEntries} />
  </FilteredStyled.Wrapper>
);

export default FilteredActivities;
