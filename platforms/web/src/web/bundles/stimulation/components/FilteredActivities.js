// @flow
import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { ActivityConnection } from 'core/types';
import ActivityList from './ActivityList';

type Props = {
  activities: ActivityConnection[],
};

const Wrapper = styled.div`
  padding: 15px;
`;

const ListHeader = styled(Flex)`
  margin: 34px 0 15px;
`;

const ListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;

const FilteredActivities = ({ activities }: Props) => {
  console.log('activities');
  console.log(activities);

  return (
    <Wrapper>
      <ListHeader justify="space-between" align="center">
        <ListTitle is="h3">{`This Week's activities`}</ListTitle>
      </ListHeader>

      <ActivityList activities={activities.edges} />
    </Wrapper>
  );
};

export default FilteredActivities;
