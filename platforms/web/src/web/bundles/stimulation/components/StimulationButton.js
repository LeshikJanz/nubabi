// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';

const ButtonWrapper = styled(Flex)`
  border-radius: 4px;
  cursor: pointer;
  justify-content: space-around;
  align-items: center;
  height: 68px;
  width: 30%;
  min-width: 190px;
  margin-top: 15px;
  margin: 15px 5px 0;
  box-shadow: ${props => props.theme.shadows.panel};
  justify-content: center;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  background-color: ${props =>
    (JSON.parse(props.active) && props.theme.shadows.panel) || '#fff'};

  > svg {
    max-height: 25px;
    max-width: 25px;
    margin-right: 10px;
  }
`;

const ButtonText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.14;
  letter-spacing: 0.9px;
  color: ${props => props.theme.colors.gray3};
`;

type Props = {
  button: StimulationButtonType,
  selectedFilter: string,
  handleClick: Function,
};

const StimulationButton = ({ button, selectedFilter, handleClick }: Props) => (
  <ButtonWrapper
    active={(selectedFilter === button.type).toString()}
    onClick={handleClick}
  >
    {iconMappings(button.icon)()}
    <ButtonText>{button.text}</ButtonText>
  </ButtonWrapper>
);

export default StimulationButton;
