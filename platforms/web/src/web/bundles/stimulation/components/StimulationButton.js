// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import * as StimulationButtonStyled from '../styled/StimulationButtonStyled';

type Props = {
  button: StimulationButtonType,
  selectedFilter: string,
  handleClick: Function,
};

const StimulationButton = ({ button, selectedFilter, handleClick }: Props) => (
  <StimulationButtonStyled.Wrapper
    active={(selectedFilter === button.type).toString()}
    onClick={handleClick}
  >
    {iconMappings(button.icon)()}
    <StimulationButtonStyled.Text>{button.text}</StimulationButtonStyled.Text>
  </StimulationButtonStyled.Wrapper>
);

export default StimulationButton;
