// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { ActivityItem } from 'web/elements/ActivityItem/index';

type Props = {
  activities: any,
  name: string,
};

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

const MoreLink = styled(Box)`
  font-size: 12px;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const ActivitiesList = styled.ul`
  margin: 0;
  padding: 0;
`;

class Activities extends PureComponent<Props> {
  render() {
    const { activities, name } = this.props;

    return (
      <ActivitiesListWrapper>
        <ActivitiesListHeader justify="space-between" align="center">
          <ActivitiesListTitle is="h3">{name}'s week ahead</ActivitiesListTitle>
          <MoreLink is="a" href="/profile">
            See all activities
          </MoreLink>
        </ActivitiesListHeader>

        <ActivitiesList>
          {activities &&
            activities.edges.map(edge => (
              <ActivityItem key={edge.id} activity={edge} />
            ))}
        </ActivitiesList>
      </ActivitiesListWrapper>
    );
  }
}

export default Activities;
