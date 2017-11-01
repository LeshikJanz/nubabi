// @flow
import React, { PureComponent } from "react";
import { Menu } from "web/elements";

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void
};

class Header extends PureComponent<Props> {
  render() {
    return (
      <header>
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
      </header>
    );
  }
}

export default Header;
