// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';
import { Button } from 'web/elements/Button/index';
import { ACTIVITY_BUTTONS } from '../constants/index';

const Wrapper = styled(Flex)`
  width: 70%;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 13px;
  text-align: center;
  cursor: pointer;
  height: 80px;
  justify-content: space-around;

  > svg {
    width: 46px;
    height: 100%;
  }

  > div:last-child {
    width: 90px;
    min-height: 30px;
  }

  > button {
    border-radius: 100px;
    background-color: #ea3154;
    color: #fff;
    border: none;
    font-size: 14px;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
`;

const ButtonMainText = styled.div`
  color: ${props => props.theme.colors.open.gray45};
  font-size: 13px;
  line-height: 1.31;
`;

const ButtonAdditionalText = styled.div`
  color: ${props => props.theme.colors.open.gray74};
  font-size: 13px;
  line-height: 1.31;
`;

type Props = {
  handleMenu: Function,
};

const FinishedActivityButton = ({ handleMenu }: Props) => {
  const completedActivity = ACTIVITY_BUTTONS.find(a => a.type === 'done');

  return (
    <Wrapper>
      {iconMappings(completedActivity.icon)()}
      <div>
        <ButtonMainText>{completedActivity.mainText}</ButtonMainText>
        <ButtonAdditionalText>
          {completedActivity.additionalText}
        </ButtonAdditionalText>
      </div>
      <Button onClick={() => handleMenu(true)}>Change</Button>
    </Wrapper>
  );
};

export default FinishedActivityButton;
