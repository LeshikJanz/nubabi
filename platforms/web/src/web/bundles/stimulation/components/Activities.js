// @flow
import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled, { css } from 'styled-components';
import { STIMULATION_BUTTONS } from '../constants';
import StimulationButton from './StimulationButton';
import ActivityList from './ActivityList';
import { compose, withState, withHandlers } from 'recompose';
import { ACTIVITY_FILTERS } from './constants/index';
import { withRouter } from 'react-router-dom';
import { ActivityConnection } from 'core/types';

export const media = {
  handheld: (...args) => css`
    @media (max-width: 1180px) {
      ${css(...args)};
    }
  `,
};

const ActivitiesListWrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
`;

const ActivityButtons = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  ${media.handheld`
    justify-content: center;
  `};
`;

const ActivitiesListHeader = styled(Flex)`
  margin: 34px 0 15px;
`;

const ActivitiesListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;

type Props = {
  selectedFilter: string,
  handleNavigate: Function,
  activities: ActivityConnection[],
};

const Activities = ({ selectedFilter, handleNavigate, activities }: Props) => (
  <ActivitiesListWrapper>
    <ActivityButtons>
      {STIMULATION_BUTTONS.map(b => (
        <StimulationButton
          key={b.id}
          button={b}
          selectedFilter={selectedFilter}
          handleClick={() => handleNavigate(b.redirect)}
        />
      ))}
    </ActivityButtons>
    <ActivitiesListHeader justify="space-between" align="center">
      <ActivitiesListTitle is="h3">
        {`This Week's activities`}
      </ActivitiesListTitle>
    </ActivitiesListHeader>

    <ActivityList activities={activities.edges} />
  </ActivitiesListWrapper>
);

export default compose(
  withRouter,
  withState('selectedFilter', 'handleFilter', ACTIVITY_FILTERS.weeks),
  withHandlers({
    handleNavigate: ({ history }) => redirect => history.push(redirect),
  }),
)(Activities);
