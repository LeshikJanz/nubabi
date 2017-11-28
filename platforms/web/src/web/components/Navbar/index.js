// @flow
import React, { PureComponent } from 'react';
import { Box, Flex } from 'grid-styled';
import styled from 'styled-components';
import { Nav, Menu } from 'web/elements';
import IChart from 'web/assets/images/icons/chart.svg';
import IPerson from 'web/assets/images/icons/person.svg';
import ILibrary from 'web/assets/images/icons/library.svg';
import IPhotos from 'web/assets/images/icons/photos.svg';
import IPuzzle from 'web/assets/images/icons/puzzle.svg';
import ProfileHeader from './ProfileHeader';
import SideBar from 'web/components/Sidebar';

type Props = {
  location: {
    pathname: string,
  },
  baby: any,
  children: any,
};

const Wrapper = styled(Box)`
  width: 100%;
  border-right: 1px solid ${props => props.theme.colors.open.white2};
`;

const MenuWrapper = styled(Flex)`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const MainMenu = styled.ul`
  width: 25%;
  margin: 0;
  padding: 0;
  min-width: 290px;
  background: ${props => props.theme.colors.white};
`;

const ContentWrapper = styled.div`
  width: 100%;
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
    color: ${props => props.theme.colors.paragraph};
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
    > svg > g > g {
      fill: red;
    }
  }

  > svg {
    margin-right: 10px;

    & > g > g {
      transition: ${props => props.theme.transition('fill')};
    }
  }
`;

class NavBar extends PureComponent<Props> {
  render() {
    const { location, baby, children } = this.props;

    return (
      <Wrapper width={1 / 4} is={Nav}>
        {baby &&
          location.pathname === '/profile' && <ProfileHeader {...baby} />}

        <MenuWrapper>
          <MainMenu>
            <MenuItem>
              <MenuLink to="/profile" active={location.pathname === '/profile'}>
                <IPerson /> {baby && baby.name}`s overview
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/growth" active={location.pathname === '/growth'}>
                <IChart /> Growth
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                to="/stimulation"
                active={location.pathname === '/stimulation'}
              >
                <IPuzzle /> Stimulation
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/library" active={location.pathname === '/library'}>
                <ILibrary /> Library
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                to="/memories"
                active={location.pathname === '/memories'}
              >
                <IPhotos /> Memories
              </MenuLink>
            </MenuItem>
          </MainMenu>
          <ContentWrapper>{children}</ContentWrapper>
          <SideBar />
        </MenuWrapper>
      </Wrapper>
    );
  }
}

export default NavBar;
