// @flow
import React, { PureComponent } from "react";
import { Menu, Header } from "web/elements";
import styled from 'styled-components';

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void
};

const Wrapper = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

class AppHeader extends PureComponent<Props> {
  render() {
    return (
      <Wrapper>
        <Menu>
          <Menu.Link to="/" active={this.props.pathname === "/"}>
            Home
          </Menu.Link>
          <Menu.Link to="/about" active={this.props.pathname === "/about"}>
            About
          </Menu.Link>
          {this.props.isAuthenticated && (
            <Menu.Link
              to="/profile"
              active={this.props.pathname === "/profile"}
            >
              Profile
            </Menu.Link>
          )}
          {this.props.isAuthenticated && (
            <Menu.Link name="logout" onClick={this.props.logout}>
              LogOut
            </Menu.Link>
          )}
          {!this.props.isAuthenticated && (
            <Menu.Link
              to="/login?redirect=/profile"
              active={this.props.pathname === "/login?redirect=/profile"}
            >
              Login
            </Menu.Link>
          )}
        </Menu>
      </Wrapper>
    );
  }
}

export default AppHeader;
