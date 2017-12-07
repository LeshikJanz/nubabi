import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const OrElemBlock = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0 0 3px 0px ${props => props.theme.colors.gray};
`;

const Span = styled.span`
  color: #ea3154;
  font-size: 12px;
  font-family: sans-serif;
`;

const OrElem = () => {
  return (
    <OrElemBlock>
      <Span>-OR-</Span>
    </OrElemBlock>
  );
};

export default OrElem;
