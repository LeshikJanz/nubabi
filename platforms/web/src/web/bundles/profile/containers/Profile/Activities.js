// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { ActivityConnection } from 'core/types';
import ActivityList from 'web/bundles/stimulation/components/ActivityList';

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

class Activities extends PureComponent<Props> {
  render() {
    const { activities, name } = this.props;

    return (
      <ActivitiesListWrapper>
        <ActivitiesListHeader justify="space-between" align="center">
          <ActivitiesListTitle is="h3">{`${
            name
          }'s week ahead`}</ActivitiesListTitle>
          <MoreLink is="a" href="/profile">
            See all activities
          </MoreLink>
        </ActivitiesListHeader>
        <ActivityList activities={activities} />
      </ActivitiesListWrapper>
    );
  }
}

export default Activities;
