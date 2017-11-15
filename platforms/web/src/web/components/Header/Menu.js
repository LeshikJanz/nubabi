// @flow
import React, { PureComponent } from "react";
import styled from 'styled-components';
import { Menu } from "web/elements";

import Avatar from '../../../common/images/avatar.png';

type Props = {

};

const Wrapper = styled.div`
  position: relative;
`;

const HeaderMenu = styled(Menu)`
  width: 200px;
  background: white;
  position: absolute;
  top: 30px;
  right: 0px;
  visibility: hidden;
  border: 1px solid gray;
  z-index: 99;
  
  &:hover {
    visibility: visible;
  }
`;

const HeaderMenuItem = styled(Menu.Link)`
  display: block;
`;

const MenuAvatar = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  
  > img {
    max-width: 100%;
  }
  
  &:hover {
    + div {
     visibility: visible;
    }
  }
  
  &:after {
    content: '';
    display: inline-block;
    width: 0; 
    height: 0; 
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.open.gray2};
  }
`;

class MenuComponent extends PureComponent<Props> {
  render() {
    return (
      <Wrapper>
        <MenuAvatar><img src={Avatar} alt="me"/></MenuAvatar>

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