// @flow
import React from 'react';
import { ActivityConnection, ActivityHistoryItemFragment } from 'core/types';
import * as ActivitiesStyled from '../../styled/ActivitiesStyled';
import ActivityList from '../../containers/activityList';
import moment from 'moment';
import styled from 'styled-components';

const HistoryWrapper = styled.div`
  margin-top: 50px;
`;

type Props = {
  activities: ActivityConnection[],
  activeHistory: ActivityHistoryItemFragment,
};

const HistoryList = ({ activities, activeHistory }: Props) => (
  <HistoryWrapper>
    <ActivitiesStyled.ListWrapper>
      <ActivitiesStyled.ListHeader justify="space-between" align="center">
        <ActivitiesStyled.ListTitle is="h3">
          {moment(activeHistory.startDate).format('DD MMMM')} -{' '}
          {moment(activeHistory.endDate).format('DD MMMM YYYY')}
        </ActivitiesStyled.ListTitle>
      </ActivitiesStyled.ListHeader>

      <ActivityList activities={activities.edges} />
    </ActivitiesStyled.ListWrapper>
  </HistoryWrapper>
);

export default HistoryList;
