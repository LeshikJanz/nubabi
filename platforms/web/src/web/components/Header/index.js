// @flow
import React, { PureComponent } from "react";
import { Header } from "web/elements";
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

import Logo from '../../../../src/common/icons/logo.svg';
import Notifications from './Notifications';
import BabySelect from './BabySelect';

import Menu from './Menu';

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void
};

const Wrapper = styled(Header)`
  min-width: 768px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 70px;
  padding: 0 20px;
  background: ${props => props.theme.colors.white};
`;

const HeaderContent = styled(Flex)`
  max-width: 1400px;
  align-items: stretch;
`;

const AppLogo = styled(Box)``;

const HeaderLeft = styled(Flex)`
  align-items: center;
`;

const HeaderCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  >* {
    margin-right: 15px;
  }
`;

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
        <HeaderContent align='center' justify="space-between" flex="1 1 auto">
          <HeaderLeft width={1/3}>
            <Link to="/profile"><AppLogo is={Logo} /></Link>
          </HeaderLeft>

          <HeaderCenter width={1/4}>
            <BabySelect />
          </HeaderCenter>

          <HeaderRight width={1/3}>
            <HeaderInfoBox>8 days of your trial remaining. <Link to="/"> Subscribe Now</Link> </HeaderInfoBox>

            <Notifications />

            <HeaderMenu is={Menu} {...this.props}/>
          </HeaderRight>
        </HeaderContent>
      </Wrapper>
    );
  }
}

export default AppHeader;
