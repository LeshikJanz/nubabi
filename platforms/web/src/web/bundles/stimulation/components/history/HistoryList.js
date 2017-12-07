// @flow
import React from 'react';
import { ActivityConnection } from 'core/types';
import * as ActivitiesStyled from '../../styled/ActivitiesStyled';
import ActivityList from '../../containers/activityList';

type Props = {
  activities: ActivityConnection[],
};

const HistoryList = ({ activities }: Props) => (
  <ActivitiesStyled.ListWrapper>
    <ActivitiesStyled.ListHeader justify="space-between" align="center">
      <ActivitiesStyled.ListTitle is="h3">History</ActivitiesStyled.ListTitle>
    </ActivitiesStyled.ListHeader>

    <ActivityList activities={activities.edges} />
  </ActivitiesStyled.ListWrapper>
);

export default HistoryList;
