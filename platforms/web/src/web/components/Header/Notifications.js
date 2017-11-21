// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import onClickOutside from 'react-onclickoutside';

import { Menu } from '../../../../src/web/elements';
import INotification from '../../../images/icons/notification.svg';
import IPerson from '../../../images/icons/person.svg';
import IPhotos from '../../../images/icons/photos.svg';
import IFirstBirth from '../../../../src/common/images/memories/first-birthday.png';
import IFirstTooth from '../../../../src/common/images/memories/first-tooth.png';

type Props = {};

const Notifications = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotificationIndicator = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 4px;
  background: ${props => props.theme.colors.primary};
  border-radius: 5px;
`;

const NotificationsListWrapper = styled.div`
  min-width: 210px;
  padding: 0;
  margin: 15px 0 0 0;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const NotificationsListHeader = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding: 15px;
  margin: 0;
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
`;

const NotificationsList = styled(Menu)`
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
`;

const NotificationsListItem = styled(Menu.Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const NotificationImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 20px 0 0;
`;

const NotificationContent = styled.div`
  min-width: 300px;
  > p {
    margin: 0 0 5px;
  }
`;

const NotificationInfo = styled.small`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    width: 15px;
    margin-right: 10px;
  }
`;

const modalStyles = {
  overlay: {
    zIndex: 5,
    background: 'none',
    position: 'absolute',
  },
  content: {
    minWidth: '250px',
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

class AppNotifications extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickOutside(e) {
    this.closeModal();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <Notifications className="AppNotifications">
        <INotification onClick={this.openModal} />
        <NotificationIndicator />

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Edit Photo Menu"
          onRequestClose={this.closeModal}
          style={modalStyles}
          parentSelector={() => document.querySelector('.AppNotifications')}
        >
          <NotificationsListWrapper>
            <NotificationsListHeader>Notifications</NotificationsListHeader>
            <NotificationsList>
              <NotificationsListItem to="/profile">
                <NotificationImage src={IFirstBirth} />
                <NotificationContent>
                  <p>
                    <strong>Savannah Cooper</strong> posted a photo to Joshua’s
                    Memories.
                  </p>
                  <NotificationInfo>
                    <IPhotos /> 4 days ago
                  </NotificationInfo>
                </NotificationContent>
              </NotificationsListItem>

              <NotificationsListItem name="/profile">
                <NotificationImage src={IFirstTooth} />
                <NotificationContent>
                  <p>
                    <strong>Charlotte</strong> added a Special Memory for
                    Joshua: First Tooth
                  </p>
                  <NotificationInfo>
                    <IPerson /> 4 days ago
                  </NotificationInfo>
                </NotificationContent>
              </NotificationsListItem>
            </NotificationsList>
          </NotificationsListWrapper>
        </Modal>
      </Notifications>
    );
  }
}

export default onClickOutside(AppNotifications);
