// @flow
import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';

const ActivitiesListItem = styled.li`
  ${props => props.theme.activityItem};
`;

const ActivitiesListItemImage = styled.img`
  max-width: 113px;
  max-height: 119px;
  border-radius: 4px 0 0 4px;
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

export const ActivityItem = ({ activity }: any) => (
  <ActivitiesListItem key={activity.node.id}>
    <ActivitiesListItemImage
      src={
        activity.node.skillArea.image && activity.node.skillArea.image.thumb.url
      }
    />
    <ActivitiesListItemContent>
      <ActivitiesHeader>
        <h4>{activity.node.name}</h4>
        <div>
          <img
            src={iconMappings(activity.node.skillArea.icon)}
            alt="skill area"
          />
        </div>
      </ActivitiesHeader>
      <p>{activity.node.introduction}</p>
    </ActivitiesListItemContent>
  </ActivitiesListItem>
);
