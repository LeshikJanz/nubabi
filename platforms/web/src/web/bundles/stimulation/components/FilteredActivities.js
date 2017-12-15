// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityList from '../containers/activityList';
import * as FilteredStyled from '../styled/FilteredActivitiesStyled';
import * as ActivitiesStyled from '../styled/ActivitiesStyled';

type Props = {
  activities: ActivityConnection[],
  loadMoreEntries: Function,
  getCurrentCategory: Function,
};

const FilteredActivities = ({
  activities,
  loadMoreEntries,
  getCurrentCategory,
}: Props) => {
  const category = getCurrentCategory();
  const categoryName =
    (category && category.node ? category.node.name : category) || '';

  return (
    <FilteredStyled.Wrapper>
      <ActivitiesStyled.ListHeader justify="space-between" align="center">
        <ActivitiesStyled.ListTitle is="h3">
          {categoryName}
        </ActivitiesStyled.ListTitle>
      </ActivitiesStyled.ListHeader>

      <ActivityList activities={activities} onLoadMore={loadMoreEntries} />
    </FilteredStyled.Wrapper>
  );
};

export default FilteredActivities;
