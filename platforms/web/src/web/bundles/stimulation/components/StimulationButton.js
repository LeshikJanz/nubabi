// @flow
import React, { PureComponent } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { IStimulationButton } from 'web/types/custom';
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
  background-color: #ffffff;
  box-shadow: ${props => props.theme.shadows.panel};
  justify-content: center;

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

class StimulationButton extends PureComponent<Props> {
  render() {
    const { button } = this.props;

    return (
      <ButtonWrapper>
        {iconMappings(button.icon)()}
        <ButtonText>{button.text}</ButtonText>
      </ButtonWrapper>
    );
  }
}

export default StimulationButton;
