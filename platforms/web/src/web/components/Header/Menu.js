// @flow
import React, { Component } from 'react';
import type { User } from 'core/types';
import styled from 'styled-components';
import Modal from 'react-modal';
import onClickOutside from 'react-onclickoutside';
import { path } from 'ramda';

import { Menu } from 'web/elements';
// import Avatar from 'core/images/avatar.png';

type Props = {
  isAuthenticated: boolean,
  pathname: string,
  logout: () => void,
  user: User,
};

const Wrapper = styled.div`
  position: relative;
`;

const HeaderMenu = styled(Menu)`
  min-width: 210px;
  padding: 0;
  margin: 15px 0 0 0;
  list-style: none;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-radius: 4px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.light};
  position: relative;
`;

const HeaderMenuItem = styled(Menu.Link)`
  display: block;
  padding: 15px;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
  color: ${props => props.theme.colors.open.gray3};
  cursor: pointer;
  font-size: 14px;
  font-family: ${props => props.theme.text.fontFamily};
  text-decoration: none;

  &:last-child {
    border: none;
  }
`;

const modalStyles = {
  overlay: {
    zIndex: 5,
    background: 'none',
    position: 'absolute',
  },
  content: {
    maxWidth: '250px',
    position: 'absolute',
    top: '20px',
    left: 'auto',
    right: '-25px',
    bottom: 'auto',
    background: 'none',
    border: 'none',
    padding: '0',
  },
};

const MenuAvatar = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;

  > img {
    max-width: 100%;
    border-radius: 50%;
  }

  &:hover {
    + div {
      visibility: visible;
    }
  }

  &:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.open.gray2};
  }
`;

class MenuComponent extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };
  }

  handleClickOutside() {
    this.closeModal();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { user } = this.props;
    return (
      <Wrapper className="AppHeaderMenu">
        <MenuAvatar onClick={this.openModal}>
          <img src={path(['avatar', 'thumb', 'url'], user)} alt="me" />
        </MenuAvatar>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Edit Photo Menu"
          onRequestClose={this.closeModal}
          style={modalStyles}
          parentSelector={() => document.querySelector('.AppHeaderMenu')}
        >
          <HeaderMenu>
            {this.props.isAuthenticated && (
              <HeaderMenuItem
                to="/settings"
                active={this.props.pathname === '/settings'}
              >
                My Profile &amp; settings
              </HeaderMenuItem>
            )}
            {this.props.isAuthenticated && (
              <HeaderMenuItem name="/profile" onClick={this.props.logout}>
                Redeem a Voucher
              </HeaderMenuItem>
            )}
            {this.props.isAuthenticated && (
              <HeaderMenuItem name="logout" onClick={this.props.logout}>
                LogOut
              </HeaderMenuItem>
            )}
            {!this.props.isAuthenticated && (
              <HeaderMenuItem
                to="/login?redirect=/profile"
                active={this.props.pathname === '/login?redirect=/profile'}
              >
                Login
              </HeaderMenuItem>
            )}
          </HeaderMenu>
        </Modal>
      </Wrapper>
    );
  }
}

export default onClickOutside(MenuComponent);
