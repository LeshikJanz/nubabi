// @flow
import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { Baby } from 'core/types/modelTypes';
import { ActivityItem } from 'web/elements/ActivityItem/index';

type Props = Baby;

const ActivitiesListWrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
`;

const ActivitiesListHeader = styled(Flex)`
  margin: 0 0 15px;
`;

const ActivitiesListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;

const ActivitiesList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const Activities = ({ activities }: Props) => (
  <ActivitiesListWrapper>
    <ActivitiesListHeader justify="space-between" align="center">
      <ActivitiesListTitle is="h3">The Week's activities</ActivitiesListTitle>
    </ActivitiesListHeader>

    <ActivitiesList>
      {activities &&
        activities.edges.map(edge => (
          <ActivityItem key={edge.id} activity={edge} />
        ))}
    </ActivitiesList>
  </ActivitiesListWrapper>
);
