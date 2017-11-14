// @flow
import React, { PureComponent } from "react";
import { Header } from "web/elements";
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

import Logo from '../../../../src/common/icons/logo.svg';
import INotification from '../../../../src/common/icons/notification.svg';

import Menu from './Menu';

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void
};

const Wrapper = styled(Header)`
  min-width: 768px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  padding: 0 20px;
  background: ${props => props.theme.colors.white};
`;

const Inner = styled(Flex)`
  max-width: 1400px;
`;

const AppLogo = styled(Box)``;

const HeaderLeft = styled(Box)``;

const HeaderCenter = styled(Box)`
  text-align: center;
`;

const HeaderRight = styled(Flex)``;

const HeaderInfoBox = styled(Box)`
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 12px;
  color:  ${props => props.theme.overlay.gray3};
  
  > a {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeaderMenu = styled(Box)`
  
`;

class AppHeader extends PureComponent<Props> {
  render() {
    return (
      <Wrapper>
        <Inner align='center' justify="space-between" flex="1 1 auto">
          <HeaderLeft width={1/3}>
            <Link to="/profile"><AppLogo is={Logo} /></Link>
          </HeaderLeft>
          <HeaderCenter width={1/4}>
            Charlotte
          </HeaderCenter>
          <HeaderRight width={1/3} justify="space-between" align="center">
            <HeaderInfoBox>8 days of your trial remaining. <Link to="/"> Subscribe Now</Link> </HeaderInfoBox>
            <INotification/>
            <HeaderMenu is={Menu} {...this.props}/>
          </HeaderRight>
        </Inner>
      </Wrapper>
    );
  }
}

export default AppHeader;
