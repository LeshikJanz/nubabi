// @flow
import type { Baby } from 'core/types';
import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import moment from 'moment';
import Modal from 'react-modal';
import onClickOutside from 'react-onclickoutside';
import { Link } from 'react-router-dom';
import IWeight from 'web/assets/images/icons/weight.svg';
import IHeight from 'web/assets/images/icons/height.svg';
import IEdit from 'web/assets/images/icons/edit.svg';
import ICamera from 'web/assets/images/icons/camera.svg';

import { Header, Button } from 'web/elements';

type Props = Baby;

const Main = styled(Flex)`
  height: 250px;
  padding: 20px;
  background: url(${props => props.image});
  background-size: cover;
  background-position: bottom;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${props => props.theme.overlay.gray3};
    z-index: 0;
  }

  > * {
    z-index: 1;
  }
`;

const EditPhotosButton = styled(Flex)`
  border: none;
  font-size: 12px;
  color: ${props => props.theme.colors.white};
  margin: 0 0 0 auto;
  align-self: flex-start;
  cursor: pointer;

  > svg {
    margin: 0 0 10px;
  }
`;

const BabyInfo = styled(Flex)`
  align-items: center;
`;

const BabyName = styled.h2`
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
  font-size: 30px;
  font-family: ${props => props.theme.text.fontFamily};
  font-weight: 200;
  margin: 0 20px 0 0;
`;

const BabyDoB = styled.p`
  color: white;
  font-size: 14px;
  font-family: ${props => props.theme.text.fontFamily};
  font-weight: normal;
  background: ${props => props.theme.colors.primary};
  border-radius: 15px;
  padding: 5px 15px;
  margin: 0;
`;

const Footer = styled(Flex)`
  color: ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
  position: relative;
  font-family: sans-serif;
  height: 55px;
`;

const FooterItem = styled(Flex)`
  padding: 5px 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  > * {
    margin-right: 10px;
  }
`;

const Label = styled.span`
  font-size: 12px;
  text-transform: uppercase;
`;

const Measure = styled.span`
  font-size: 16px;
`;

const Count = styled.span`
  font-size: 22px;
`;

const Separator = styled.span`
  height: 27px;
  width: 1px;
  border-right: 1px solid ${props => props.theme.colors.open.white2};
`;

const EditProfileButton = styled(Link)`
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 35px;
  width: 138px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.open.gray1};
  color: ${props => props.theme.colors.open.secondary};
  text-transform: uppercase;
  font-weight: 300;
  font-size: 13px;
  padding-top: 1px;

  &:hover {
    text-decoration: none;
  }
`;

const PhotoActionsList = styled.ul`
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

  &:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${props => props.theme.colors.white};
  }
`;

const PhotoActionsListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
  color: ${props => props.theme.colors.open.gray3};
  cursor: pointer;
  font-size: 14px;
  font-family: ${props => props.theme.text.fontFamily};

  &:last-child {
    border: none;
  }
`;

const PhotoActionsTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: normal;
  color: ${props => props.theme.colors.open.white2};
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;

  > svg {
    margin-right: 5px;
  }
`;

const modalStyles = {
  overlay: {
    position: 'absolute',
    background: 'rgba(116, 130, 148, .7)',
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: '87%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    border: 'none',
    color: 'white',
    padding: 0,
    overflow: 'visible',
  },
};

const PhotoChangeIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  width: 34px;
  height: 34px;
  border: 2px solid ${props => props.theme.colors.white};
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  background: ${props => props.theme.colors.primary};
  z-index: 4;
`;

class ProfileHeader extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };
  }

  handleClickOutside(e) {
    e.preventDefault();
    this.closeModal();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { coverImage, dob, name, weight, height, id } = this.props;

    return (
      <Box width={1} is={Header}>
        <Main
          image={coverImage && coverImage.url}
          align="flex-end"
          className="ProfileHeaderMain"
        >
          {' '}
          {this.state.modalIsOpen && (
            <PhotoChangeIcon>
              <ICamera />
            </PhotoChangeIcon>
          )}
          <BabyInfo>
            <BabyName>{name}</BabyName>
            <BabyDoB>{moment(dob).fromNow(true)} old</BabyDoB>
          </BabyInfo>
          <EditPhotosButton
            align="center"
            justify="space-between"
            direction="column"
            onClick={this.openModal}
          >
            <IEdit /> Edit photos
          </EditPhotosButton>
          <Modal
            style={modalStyles}
            isOpen={this.state.modalIsOpen}
            contentLabel="Edit Photo Menu"
            onRequestClose={this.closeModal}
            parentSelector={() =>
              document.querySelector('.ProfileHeaderMain')
            } /* Main component should have such className */
          >
            <PhotoActionsTitle>
              <ICamera /> Change Cover Photo
            </PhotoActionsTitle>
            <PhotoActionsList>
              <PhotoActionsListItem>Upload photo</PhotoActionsListItem>
              <PhotoActionsListItem>Remove</PhotoActionsListItem>
              <PhotoActionsListItem onClick={this.closeModal}>
                Cancel
              </PhotoActionsListItem>
            </PhotoActionsList>
          </Modal>
        </Main>

        <Footer justify="flex-start" align="center" py={7} px={15}>
          <FooterItem>
            <IWeight /> <Label>Weight:</Label>{' '}
            <span>
              <Count>{weight}</Count>
              <Measure>kg</Measure>
            </span>
          </FooterItem>
          <Separator />
          <FooterItem>
            <IHeight /> <Label>Height:</Label>{' '}
            <span>
              <Count>{height}</Count>
              <Measure>cm</Measure>
            </span>
          </FooterItem>

          <EditProfileButton to={`/babyprofile/${id}`} ml="auto" is={Button}>
            Edit profile
          </EditProfileButton>
        </Footer>
      </Box>
    );
  }
}

export default onClickOutside(ProfileHeader);
