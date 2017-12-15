// @flow
import React from 'react';
import ActivityItem from 'web/elements/ActivityItem';
import type { ActivityConnection } from 'core/types';
import * as ActivityListStyled from '../styled/ActivityListStyled';

type Props = {
  activities: ActivityConnection,
  handleNavigateToActivity: Function,
  switchable: boolean,
};

const ActivityList = ({
  activities,
  handleNavigateToActivity,
  switchable = false,
}: Props) => (
  <ActivityListStyled.List>
    {activities.map(({ node }) => (
      <ActivityItem
        key={node.id}
        activity={node}
        handleClick={handleNavigateToActivity}
        switchable={switchable}
      />
    ))}
  </ActivityListStyled.List>
);

export default ActivityList;
