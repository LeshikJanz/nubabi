// @flow
import React, { PureComponent } from "react";
import { Menu } from "web/elements";

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void
};

class Header extends PureComponent {
  props: Props;

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
          <Menu.Link to="/test" active={this.props.pathname === "/test"}>
            Secure
          </Menu.Link>
          {this.props.isAuthenticated &&
            <Menu.Link name="logout" onClick={this.props.logout}>
              LogOut
            </Menu.Link>}
        </Menu>
      </header>
    );
  }
}

export default Header;
