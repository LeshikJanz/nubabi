// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

type Props = {
  message?: any,
};

const WrapperContent = styled(Flex)`
  width: 100%;
  justify-content: center;
`;

export const NoContentView = ({ message = 'Nothing found' }: Props) => {
  return <WrapperContent>{message}</WrapperContent>;
};

export default NoContentView;
