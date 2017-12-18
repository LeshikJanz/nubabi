// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

const RightSidebar = styled(Flex)`
  flex-grow: 1;
  max-width: 230px;
  flex-direction: column;
`;

const SubscribeRightSidebar = () => {
  return <RightSidebar>RightSidebar</RightSidebar>;
};

export default SubscribeRightSidebar;
