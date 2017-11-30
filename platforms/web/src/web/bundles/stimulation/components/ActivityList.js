// @flow
import React from 'react';
import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import styled from 'styled-components';
import ActivityItem from 'web/elements/ActivityItem';
import { compose } from 'ramda';
import { withRouter } from 'react-router-dom';
import { ActivityConnection } from 'core/types';

type Props = {
  activities: ActivityConnection,
  history: any,
};

const ActivitiesList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ActivityList = ({ activities, history }: Props) => {
  const handleNavigateToActivity = ({ id }) =>
    history.push(`/stimulation/${id}`);

  return (
    <ActivitiesList>
      {activities.edges.map(({ node }, i) => (
        <ActivityItem
          key={i}
          activity={node}
          handleClick={handleNavigateToActivity}
        />
      ))}
    </ActivitiesList>
  );
};

export default compose(
  ShowNoContentViewIf(props => !props.activities),
  withRouter,
)(ActivityList);
