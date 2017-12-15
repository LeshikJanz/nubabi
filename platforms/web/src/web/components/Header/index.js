// @flow
import React, { PureComponent } from 'react';
import { Header } from 'web/elements';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';
import Logo from 'web/assets/images/icons/logo.svg';
import Notifications from './Notifications';
import BabySelect from './BabySelect';

import Menu from './Menu';
import { Baby } from 'core/types';

type Props = {
  pathname: string,
  isLoggedIn: boolean,
  logout: () => void,
  baby: Baby,
};

const Wrapper = styled(Header)`
  min-width: 768px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 70px;
  padding: 0 20px;
  box-shadow: ${props => props.theme.shadows.panel};
  background: ${props => props.theme.colors.white};
`;

const HeaderContent = styled(Flex)`
  max-width: 1200px;
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
  > * {
    margin-right: 15px;
  }
`;

const HeaderInfoBox = styled(Box)`
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 12px;
  color: ${props => props.theme.overlay.gray3};

  > a {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeaderMenu = styled(Box)``;

class AppHeader extends PureComponent<Props> {
  render() {
    console.log('header', this.props);
    return (
      <Wrapper>
        <HeaderContent align="center" justify="space-between" flex="1 1 auto">
          <HeaderLeft width={1 / 3}>
            <Link to="/profile">
              <AppLogo is={Logo} />
            </Link>
          </HeaderLeft>

          <HeaderCenter width={1 / 4}>
            <BabySelect {...this.props.baby} />
          </HeaderCenter>

          <HeaderRight width={1 / 3}>
            <HeaderInfoBox>
              8 days of your trial remaining. <Link to="/"> Subscribe Now</Link>{' '}
            </HeaderInfoBox>

            <Notifications {...this.props.baby} />

            <HeaderMenu is={Menu} {...this.props} />
          </HeaderRight>
        </HeaderContent>
      </Wrapper>
    );
  }
}

export default AppHeader;
