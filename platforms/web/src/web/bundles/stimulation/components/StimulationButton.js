// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import { withRouter } from 'react-router-dom';
import * as StimulationButtonStyled from '../styled/StimulationButtonStyled';

type Props = {
  button: StimulationButtonType,
  handleClick: Function,
  location: { pathname: string },
};

const StimulationButton = ({ button, handleClick, location }: Props) => (
  <StimulationButtonStyled.Wrapper
    active={(button.redirect === location.pathname).toString()}
    onClick={handleClick}
  >
    <StimulationButtonStyled.Icon>
      {iconMappings(button.icon)()}
    </StimulationButtonStyled.Icon>
    <StimulationButtonStyled.Text>{button.text}</StimulationButtonStyled.Text>
  </StimulationButtonStyled.Wrapper>
);

export default withRouter(StimulationButton);
