// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';

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
  max-height: 119px;
`;

const ActivitiesListItemImage = styled.img`
  max-width: 113px;
  max-height: 119px;
`;

const ArrowRight = styled.img`
  max-width: 7px;
`;

const ActivitiesHeader = styled(Flex)`
  justify-content: space-between;

  h4 {
    margin: 0;
  }

  > div {
    > img {
      max-width: 38px;
      max-height: 38px;
    }
  }
`;

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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
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
          {activities.edges.map(edge => {
            return (
              <ActivitiesListItem key={edge.node.id}>
                <ActivitiesListItemImage
                  src={
                    edge.node.skillArea.image &&
                    edge.node.skillArea.image.thumb.url
                  }
                />
                <ActivitiesListItemContent>
                  <ActivitiesHeader>
                    <h4>{edge.node.name}</h4>
                    <div>
                      <img
                        src={iconMappings(edge.node.skillArea.icon)}
                        alt="skill area"
                      />
                    </div>
                  </ActivitiesHeader>
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
