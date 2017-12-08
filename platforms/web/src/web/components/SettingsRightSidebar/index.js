// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

const RightSidebar = styled(Flex)`
  background-color: #fff;
  flex-grow: 1;
  max-width: 230px;
`;

const SettingsRightSidebar = () => {
  return <RightSidebar>123</RightSidebar>;
};

export default SettingsRightSidebar;
