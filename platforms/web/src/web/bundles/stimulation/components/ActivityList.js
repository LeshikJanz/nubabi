// @flow
import React from 'react';
import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import styled from 'styled-components';
import { Baby } from 'core/types';
import ActivityItem from 'web/elements/ActivityItem';
import { compose } from 'ramda';

const ActivitiesList = styled.ul`
  margin: 0;
  padding: 0;
`;

const ActivityList = ({ activities }: Baby) => (
  <ActivitiesList>
    {activities.edges.map(({ node }) => (
      <ActivityItem key={node.id} activity={node} />
    ))}
  </ActivitiesList>
);

export default compose(ShowNoContentViewIf(props => !props.activities))(
  ActivityList,
);
