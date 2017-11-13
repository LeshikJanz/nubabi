// @flow
import React, { PureComponent } from "react";
import { Box } from 'grid-styled';
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Nav, Menu } from "web/elements";

type Props = {

};

const Wrapper = styled(Box)`
  background: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.open.white2};
`;

const ProfileMenu = styled.ul`
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
`;

const MenuLink = styled(Menu.Link)`
  display: block;
  padding: 15px;
  margin: 0;
  text-decoration: none;
  color: ${props => props.theme.colors.paragraph};
  font-family: ${props => props.theme.text.fontFamily};
  &:visitied {
    color: ${props => props.theme.colors.paragraph}
  }
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  &.active {
    border-left: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.bg.panel};
  }
`;

class NavBar extends PureComponent<Props> {
  render() {
    const { location } = this.props;

    return (
      <Wrapper width={1/4} is={Nav}>
        <ProfileMenu>
          <MenuItem>
            <MenuLink to="/profile" active={location.pathname === "/profile"}>Overview</MenuLink>
          </MenuItem>
          <MenuItem><MenuLink to="/profile">Growth</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Stimulation</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Library</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile">Memories</MenuLink></MenuItem>
        </ProfileMenu>
      </Wrapper>
    );
  }
}

export default withRouter(NavBar);
