/* eslint-disable react/no-unescaped-entities */
// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import ActivityList from '../containers/ActivityList';
import * as ActivitiesStyled from '../styled/ActivitiesStyled';
import equipmentsMockData from 'web/assets/mock-data/stimulation/equipments.json';
import Equipment from './equipment/index';

type Props = {
  activities: ActivityConnection[],
  location: { pathname: string },
};

const WeekActivities = ({ activities, location: { pathname } }: Props) => (
  <ActivitiesStyled.ListWrapper>
    <ActivitiesStyled.ListHeader justify="space-between" align="center">
      <ActivitiesStyled.ListTitle is="h3">
        This Week's activities
      </ActivitiesStyled.ListTitle>
    </ActivitiesStyled.ListHeader>

    <ActivityList
      activities={activities}
      switchable
      backLink={pathname}
      backLinkName="Back to Week's activities"
    />
    <Equipment equipments={equipmentsMockData} />
  </ActivitiesStyled.ListWrapper>
);

export default WeekActivities;
