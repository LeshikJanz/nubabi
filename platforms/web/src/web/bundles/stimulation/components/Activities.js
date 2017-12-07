// @flow
import React from 'react';
import StimulationButton from './StimulationButton';
import ActivityList from '../containers/activityList';
import { ActivityConnection } from 'core/types';
import { STIMULATION_BUTTONS } from 'web/bundles/stimulation/constants';
import * as ActivitiesStyled from '../styled/ActivitiesStyled';

type Props = {
  selectedFilter: string,
  handleNavigate: Function,
  activities: ActivityConnection[],
};

const Activities = ({ selectedFilter, handleNavigate, activities }: Props) => (
  <ActivitiesStyled.ListWrapper>
    <ActivitiesStyled.Buttons>
      {STIMULATION_BUTTONS.map(b => (
        <StimulationButton
          key={b.id}
          button={b}
          selectedFilter={selectedFilter}
          handleClick={() => handleNavigate(b.redirect)}
        />
      ))}
    </ActivitiesStyled.Buttons>
    <ActivitiesStyled.ListHeader justify="space-between" align="center">
      <ActivitiesStyled.ListTitle is="h3">
        {`This Week's activities`}
      </ActivitiesStyled.ListTitle>
    </ActivitiesStyled.ListHeader>

    <ActivityList activities={activities.edges} />
  </ActivitiesStyled.ListWrapper>
);

export default Activities;
