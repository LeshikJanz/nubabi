// @flow
import React from 'react';
import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import styled from 'styled-components';
import ActivityItem from 'web/elements/ActivityItem';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { ActivityConnection } from 'core/types';

type Props = {
  activities: ActivityConnection,
  handleNavigateToActivity: Function,
};

const ActivitiesList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ActivityList = ({ activities, handleNavigateToActivity }: Props) => (
  <ActivitiesList>
    {activities.map(({ node }, i) => (
      <ActivityItem
        key={i}
        activity={node}
        handleClick={handleNavigateToActivity}
      />
    ))}
  </ActivitiesList>
);

export default compose(
  ShowNoContentViewIf(props => !props.activities),
  withRouter,
  withHandlers({
    handleNavigateToActivity: ({ history }) => ({ id }) =>
      history.push(`/stimulation/activity/${id}`),
  }),
)(ActivityList);
