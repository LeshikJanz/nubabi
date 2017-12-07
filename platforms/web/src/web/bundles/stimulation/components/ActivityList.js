// @flow
import React from 'react';
import ActivityItem from 'web/elements/ActivityItem';
import { ActivityConnection } from 'core/types';
import * as ActivityListStyled from '../styled/ActivityListStyled';

type Props = {
  activities: ActivityConnection,
  handleNavigateToActivity: Function,
};

const ActivityList = ({ activities, handleNavigateToActivity }: Props) => (
  <ActivityListStyled.List>
    {activities.map(({ node }, i) => (
      <ActivityItem
        key={i}
        activity={node}
        handleClick={handleNavigateToActivity}
      />
    ))}
  </ActivityListStyled.List>
);

export default ActivityList;
