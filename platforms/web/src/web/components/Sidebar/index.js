// @flow
import React from 'react';
import { Box, Flex } from 'grid-styled';
import styled from 'styled-components';
import config from 'core/config';
import { Aside } from 'web/elements';
import IAppStore from 'web/assets/images/appstore.png';
import IPlayMarket from 'web/assets/images/googleplay.png';
import INubabiApp from 'web/assets/images/nubabiapp.png';
import IPersons from 'web/assets/images/icons/persons.svg';
import { Link } from 'react-router-dom';

type Props = {};

const { appVersion } = config;

const SideBar = styled(Box)`
  margin: 25px 0 0;
  min-width: 235px;
  background: ${props => props.theme.bg.panel};
`;

const SideBarFooter = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 12px;
  color: ${props => props.theme.colors.secondary};

  > hr {
    height: 0;
    border: 0;
    border-top: 1px solid ${props => props.theme.colors.open.white2};
  }
`;

const Panel = styled.div`
  border: 1px solid ${props => props.theme.colors.open.gray1};
  border-radius: 4px;
  margin: 0 0 30px;
  color: ${props => props.theme.colors.open.gray3};
`;

const PanelHeader = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.open.gray1};
  padding: 15px;
  font-size: 14px;
  text-align: center;
`;

const PanelHeaderImage = styled.div`
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  background: white;
  border: 1px solid gray;
  border-radius: 100%;
  margin: 0 15px 0 0;
`;

const PanelBody = styled.div`
  padding: 15px;
  font-size: 12px;

  > a {
    color: ${props => props.theme.colors.secondary};

    &:hover {
      color: ${props => props.theme.colors.open.black0};
    }
  }
`;

const Banner = styled.div`
  text-align: center;
  padding: 10px;
`;

const BannerImage = styled.a`
  display: inline-block;
  margin-bottom: 15px;
  > img {
    max-width: 100%;
  }
`;

const Sidebar = (): Props => (
  <SideBar width={1 / 6} is={Aside}>
    <Panel>
      <PanelHeader align="center">
        <PanelHeaderImage>
          <IPersons />
        </PanelHeaderImage>
        Parenting Tips
      </PanelHeader>
      <PanelBody>
        <Link to="/profile">Twins: How do you handle two of everything?</Link>
        <br />
        <br />
        <Link to="/profile">Bonding with your baby </Link>
        <br />
        <br />
        <Link to="/profile">The benefits of wearing your baby </Link>
      </PanelBody>
    </Panel>

    <Panel>
      <PanelBody>
        <Banner>
          <img src={INubabiApp} alt="Nubabi App" />
          <h4>Have you tried the Nubabi Mobile App?</h4>
          <p>Enjoy easy access to your baby’s content, on the go!</p>
          <br />
          <BannerImage href="">
            <img src={IAppStore} alt="App Store" />
          </BannerImage>
          <BannerImage href="">
            <img src={IPlayMarket} alt="Google Play" />
          </BannerImage>
        </Banner>
      </PanelBody>
    </Panel>

    <SideBarFooter>
      <small>
        © 2017 Nubabi. About Us • FAQ & Support • Contact Us • Log Out
      </small>
      <hr />
      <small>
        All rights reserved. Use of this website is regulated by our website
        Terms of Use and Privacy Policy.
      </small>
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          marginTop: 5,
        }}
      >
        <small>Nubabi {appVersion}</small>
      </div>
    </SideBarFooter>
  </SideBar>
);

export default Sidebar;
