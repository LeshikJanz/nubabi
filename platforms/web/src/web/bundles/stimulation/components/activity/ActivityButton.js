// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import iconMappings from 'web/common/iconMappings';

const Wrapper = styled(Flex)`
  width: 165px;
  height: 139.6px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 13px;
  text-align: center;
  cursor: pointer;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }

  > svg {
    width: 46px;
  }

  > div:last-child {
    width: 90px;
    min-height: 30px;
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
  icon: string,
  mainText: string,
  additionalText: string,
};

const ActivityButton = ({ icon, mainText, additionalText }: Props) => (
  <Wrapper>
    {iconMappings(icon)()}
    <ButtonMainText>{mainText}</ButtonMainText>
    <ButtonAdditionalText>{additionalText}</ButtonAdditionalText>
  </Wrapper>
);

export default ActivityButton;
