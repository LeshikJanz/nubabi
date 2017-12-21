// @flow
import type { ActivityConnection } from 'core/types';
import React from 'react';
import * as ActivitiesStyled from '../../styled/ActivitiesStyled';
import ActivityList from '../../containers/ActivityList';
import styled from 'styled-components';

const HistoryWrapper = styled.div`
  margin-top: 50px;
`;

type Props = {
  activities: ActivityConnection[],
  timeStamp: string,
};

const HistoryList = ({ activities, timeStamp }: Props) => (
  <HistoryWrapper>
    <ActivitiesStyled.ListWrapper>
      <ActivitiesStyled.ListHeader justify="space-between" align="center">
        <ActivitiesStyled.ListTitle is="h3">
          {timeStamp}
        </ActivitiesStyled.ListTitle>
      </ActivitiesStyled.ListHeader>

      <ActivityList
        activities={activities}
        backLink="/stimulation/history"
        backLinkName="Back to History"
      />
    </ActivitiesStyled.ListWrapper>
  </HistoryWrapper>
);

export default HistoryList;
