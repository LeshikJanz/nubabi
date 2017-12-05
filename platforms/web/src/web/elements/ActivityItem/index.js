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

const SkillIcon = styled.div``;

const ActivitiesHeader = styled(Flex)`
  justify-content: space-between;

  h4 {
    margin: 0;
  }

  > ${SkillIcon} {
    background-color: #fde4e9;
    padding: 5px;
    border-radius: 50%;
    height: 38px;

    > img {
      max-width: 30px;
      max-height: 30px;
      padding: 3px;
    }
  }
`;

const ActivityName = styled.div``;

const ActivitiesListItemContent = styled(Box)`
  padding: 15px 0 15px 15px;
  width: 100%;

  > h4 {
    font-size: 16px;
    font-weight: normal;
    color: ${props => props.theme.colors.open.black0};
    margin: 0 0 10px;
  }

  ${ActivityName} {
    font-size: 14px;
    color: ${props => props.theme.colors.secondary};
    overflow: hidden;
    line-height: 1.57;
    display: -webkit-box;
    padding-right: 10px;
    padding-top: 3px;
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
            <div>
              <h4>{activity.skillArea.name}</h4>
              <ActivityName>{activity.name}</ActivityName>
            </div>
            <SkillIcon>
              <img
                src={iconMappings(activity.skillArea.icon)}
                alt="skill area"
              />
            </SkillIcon>
          </ActivitiesHeader>
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
