// @flow
import React from 'react';
import * as StimulationStyled from '../styled/index';
import { STIMULATION_BUTTONS } from '../constants';
import StimulationButton from './StimulationButton';

type Props = {
  handleNavigate: Function,
};

const Stimulation = ({ handleNavigate }: Props) => (
  <StimulationStyled.Wrapper>
    <StimulationStyled.Buttons>
      {STIMULATION_BUTTONS.map(b => (
        <StimulationButton
          key={b.id}
          button={b}
          handleClick={() => handleNavigate(b.redirect)}
        />
      ))}
    </StimulationStyled.Buttons>
  </StimulationStyled.Wrapper>
);

export default Stimulation;
