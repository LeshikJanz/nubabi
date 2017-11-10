// @flow
import React, { PureComponent } from "react";
import { Box } from 'grid-styled';
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Nav, Menu } from "web/elements";

type Props = {

};

const ProfileNavBar = styled(Box)`
  box-shadow: ${props => props.theme.shadows.primary};
`;

const ProfileMenu = styled.ul`
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 1px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const MenuLink = styled(Menu.Link)`
  display: block;
  padding: 15px;
  margin: 0;
  text-decoration: none;
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.text.fontFamily};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  &.active {
    border-left: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

class NavBar extends PureComponent<Props> {
  render() {
    const { location } = this.props;

    return (
      <ProfileNavBar width={1/4} is={Nav}>
        <ProfileMenu>
          <MenuItem><MenuLink to="/profile" active={location.pathname === "/profile"}>

            Overview
          </MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Growth</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Stimulation</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Library</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Memories</MenuLink></MenuItem>
        </ProfileMenu>
      </ProfileNavBar>
    );
  }
}

export default withRouter(NavBar);
