// @flow
import React, { PureComponent } from "react";
import { Box } from 'grid-styled';
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Nav, Menu } from "web/elements";

import IChart from '../../../../../../src/common/icons/chart.svg';
import IPerson from '../../../../../../src/common/icons/person.svg';
import ILibrary from '../../../../../../src/common/icons/library.svg';
import IPhotos from '../../../../../../src/common/icons/photos.svg';
import IPuzzle from '../../../../../../src/common/icons/puzzle.svg';

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 25px 15px;
  margin: 0;
  text-decoration: none;
  color: ${props => props.theme.colors.paragraph};
  font-family: ${props => props.theme.text.fontFamily};
  transition: ${props => props.theme.transition('color')};
  
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
  
  &:hover,
  &.active {
    >svg >g >g {
      fill: red
    }
  };
  
  >svg {
    margin-right: 10px;
    
    &>g >g {
      transition: ${props => props.theme.transition('fill')};
    }
  }
`;

class NavBar extends PureComponent<Props> {
  render() {
    const { location, name } = this.props;

    return (
      <Wrapper width={1/4} is={Nav}>
        <ProfileMenu>
          <MenuItem>
            <MenuLink to="/profile" active={location.pathname === "/profile"}><IPerson/> {name}'s overview</MenuLink>
          </MenuItem>
          <MenuItem><MenuLink to="/profile"><IChart/> Growth</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile"><IPuzzle/> Stimulation</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile"><ILibrary/> Library</MenuLink></MenuItem>
          <MenuItem><MenuLink to="/profile"><IPhotos/> Memories</MenuLink></MenuItem>
        </ProfileMenu>
      </Wrapper>
    );
  }
}

export default withRouter(NavBar);
