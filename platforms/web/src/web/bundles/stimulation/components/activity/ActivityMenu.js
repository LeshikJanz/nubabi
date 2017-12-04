// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import ActivityButton from './ActivityButton';
import { ACTIVITY_BUTTONS } from '../constants/index';
import FinishedActivityButton from './FinishedActivityButton';
import { compose, withState, lifecycle } from 'recompose';

const ActivityButtons = styled(Flex)`
  justify-content: center;
  margin-top: 24px;

  > div {
    margin: 0 8px;
  }
`;

type Props = {
  handleActivity: Function,
  isActivityMenuOpen: boolean,
  handleActivityMenu: Function,
  isCompleted: boolean,
};

const ActivityMenu = ({
  handleActivity,
  handleActivityMenu,
  isActivityMenuOpen,
  isCompleted,
}: Props) => {
  const selectActivity = a => {
    if (a.type !== 'done') {
      window.scrollTo(0, 0);
    }

    handleActivityMenu(false);
    handleActivity(a);
  };

  return (
    <ActivityButtons>
      {((!isCompleted || isActivityMenuOpen) &&
        ACTIVITY_BUTTONS.map((a, i) => (
          <ActivityButton
            key={i}
            handleActivity={() => selectActivity(a)}
            {...a}
          />
        ))) || <FinishedActivityButton handleMenu={handleActivityMenu} />}
    </ActivityButtons>
  );
};

export default compose(
  withState('isActivityMenuOpen', 'handleActivityMenu', true),
  withState('loading', 'handleLoading', false),
  lifecycle({
    componentDidMount() {
      this.props.handleActivityMenu(!this.props.isCompleted);
    },
  }),
)(ActivityMenu);
