// @flow
import type { ActivityConnection } from 'core/types';
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

type Props = {
  activities: ActivityConnection,
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

const ActivitiesListItem = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: ${props => props.theme.shadows.panel};
  background: ${props => props.theme.colors.white};
  border-radius: 4px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
`;

const ActivitiesListItemImage = styled(Box)``;

const ActivitiesListItemContent = styled(Box)`
  padding: 15px;

  > h4 {
    font-size: 16px;
    font-weight: normal;
    color: ${props => props.theme.colors.open.black0};
    margin: 0 0 10px;
  }

  > p {
    font-size: 12px;
    color: ${props => props.theme.colors.secondary};
    line-height: 18px;
  }
`;

class Activities extends PureComponent<Props> {
  render() {
    const { activities, name } = this.props;

    console.log(activities);

    return (
      <ActivitiesListWrapper>
        <ActivitiesListHeader justify="space-between" align="center">
          <ActivitiesListTitle is="h3">{name}'s week ahead</ActivitiesListTitle>
          <MoreLink is="a" href="/profile">
            See all activities
          </MoreLink>
        </ActivitiesListHeader>

        <ActivitiesList>
          {activities.edges.map(edge => {
            return (
              <ActivitiesListItem key={edge.node.id}>
                <ActivitiesListItemImage width={1 / 5} />
                <ActivitiesListItemContent width={1}>
                  <h4>{edge.node.name}</h4>
                  <p>{edge.node.introduction}</p>
                </ActivitiesListItemContent>
              </ActivitiesListItem>
            );
          })}
        </ActivitiesList>
      </ActivitiesListWrapper>
    );
  }
}

export default Activities;
