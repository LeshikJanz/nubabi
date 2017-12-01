// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';

const ActivitiesListItem = styled.li`
  ${props => props.theme.activityItem};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }
`;

const ActivitiesListItemImage = styled.img`
  max-width: 113px;
  max-height: 119px;
  border-radius: 4px 0 0 4px;
`;

const ActivitiesHeader = styled(Flex)`
  justify-content: space-between;

  h4 {
    margin: 0;
  }

  > div {
    background-color: #fde4e9;
    padding: 5px;
    border-radius: 50%;

    > img {
      max-width: 30px;
      max-height: 30px;
      padding: 3px;
    }
  }
`;

const ActivitiesListItemContent = styled(Box)`
  padding: 15px 0 15px 15px;
  width: 100%;

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
    padding-right: 10px;
  }
`;

const ActionArea = styled(Flex)`
  flex-direction: column;
  padding: 25px 10px;
  justify-content: space-between;
  align-items: flex-end;

  > svg {
    max-width: 8px;
  }
`;

class ActivityItem extends PureComponent<Props> {
  render() {
    const { activity, handleClick } = this.props;

    return (
      <ActivitiesListItem
        key={activity.id}
        onClick={() => handleClick(activity)}
      >
        <ActivitiesListItemImage
          src={activity.skillArea.image && activity.skillArea.image.thumb.url}
        />
        <ActivitiesListItemContent>
          <ActivitiesHeader>
            <h4>{activity.name}</h4>
            <div>
              <img
                src={iconMappings(activity.skillArea.icon)}
                alt="skill area"
              />
            </div>
          </ActivitiesHeader>
          <p>{activity.introduction}</p>
        </ActivitiesListItemContent>
        <ActionArea>
          <ArrowRight />
          <input
            type="checkbox"
            id={activity.id}
            checked={activity.isCompleted}
            disabled
            className="squared"
          />
          <label htmlFor={activity.id} />
        </ActionArea>
      </ActivitiesListItem>
    );
  }
}

export default ActivityItem;
