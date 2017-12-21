// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityList from '../containers/ActivityList';
import * as FilteredStyled from '../styled/FilteredActivitiesStyled';
import * as ActivitiesStyled from '../styled/ActivitiesStyled';
import { BackButton } from 'web/components';

type Props = {
  activities: ActivityConnection[],
  loadMoreEntries: Function,
  categoryName: string,
  location: { pathname: string },
  history: { push: Function },
};

const FilteredActivities = ({
  activities,
  loadMoreEntries,
  categoryName,
  location: { pathname },
  history,
}: Props) => (
  <FilteredStyled.Wrapper>
    <FilteredStyled.BackButton>
      <BackButton
        name="Back to Categories"
        handleClick={() => history.push('/stimulation/browse')}
      />
    </FilteredStyled.BackButton>
    <ActivitiesStyled.ListHeader justify="space-between" align="center">
      <ActivitiesStyled.ListTitle is="h3">
        {categoryName}
      </ActivitiesStyled.ListTitle>
    </ActivitiesStyled.ListHeader>

    <ActivityList
      activities={activities}
      backLink={pathname}
      backLinkName={`Back to ${categoryName}`}
      onLoadMore={loadMoreEntries}
    />
  </FilteredStyled.Wrapper>
);

export default FilteredActivities;
