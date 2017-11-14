// @flow
import React, { PureComponent } from "react";
import styled from 'styled-components';
import { Menu } from "web/elements";

import Avatar from '../../../common/images/avatar.png';

type Props = {

};

const Wrapper = styled.div`

`;

const HeaderMenu = styled(Menu)`
  position: absolute;
  top: 0;
  right: 0;
  //visibility: hidden;
`;

const HeaderMenuItem = styled(Menu.Link)`

`;

const MenuAvatar = styled.img`
  width: 50px;
  height: 50px;
`;

class MenuComponent extends PureComponent<Props> {
  render() {
    return (
      <Wrapper>
        <MenuAvatar src={Avatar} />

        <HeaderMenu>
          <HeaderMenuItem to="/" active={this.props.pathname === "/"}>
            Home
          </HeaderMenuItem>
          <HeaderMenuItem to="/about" active={this.props.pathname === "/about"}>
            About
          </HeaderMenuItem>
          {this.props.isAuthenticated && (
            <HeaderMenuItem
              to="/profile"
              active={this.props.pathname === "/profile"}
            >
              Profile
            </HeaderMenuItem>
          )}
          {this.props.isAuthenticated && (
            <HeaderMenuItem name="logout" onClick={this.props.logout}>
              LogOut
            </HeaderMenuItem>
          )}
          {!this.props.isAuthenticated && (
            <HeaderMenuItem
              to="/login?redirect=/profile"
              active={this.props.pathname === "/login?redirect=/profile"}
            >
              Login
            </HeaderMenuItem>
          )}
        </HeaderMenu>
      </Wrapper>
    );
  }
}


export default MenuComponent;