// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

const RightSidebar = styled(Flex)`
  flex-grow: 1;
  max-width: 230px;
  flex-direction: column;
`;

const Text = styled.span`
  width: 100%;
  color: ${props => props.theme.colors.secondary};
  font-size: 12px;
  font-weight: 300;
  line-height: 17px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin: 20px 0;
`;

const SettingsRightSidebar = () => {
  return (
    <RightSidebar>
      <Text>©2017 Nubabi. About Us </Text>
      <Text>• FAQ & Support • Contact Us • Log Out</Text>
      <Divider />
      <Text>
        All rights reserved. Use of this website is regulated by our website
        Terms of Use and Privacy Policy.
      </Text>
    </RightSidebar>
  );
};

export default SettingsRightSidebar;
