// @flow
import React, { PureComponent } from "react";
import {  Box } from 'grid-styled';
import styled from "styled-components";

import { Aside } from "web/elements";

type Props = {

};

const SideBar = styled(Box)` 
  padding: 25px 0 0;
`;

const SideBarFooter = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 12px;
  color: ${props => props.theme.colors.secondary};
  
  >hr {
    height: 0;
    border: 0;
    border-top: 1px solid ${props => props.theme.colors.open.white2};
  }
`;

class Sidebar extends PureComponent<Props> {
  render() {
    return (
      <SideBar width={1/6} is={Aside}>
        <SideBarFooter>
          <small>
            ©2017 Nubabi. About Us  • FAQ & Support • Contact Us • Log Out
          </small>
          <hr />
          <small>
            All rights reserved. Use of this website is regulated by our website Terms of Use and Privacy Policy.
          </small>
        </SideBarFooter>
      </SideBar>
    );
  }
}

export default Sidebar;
