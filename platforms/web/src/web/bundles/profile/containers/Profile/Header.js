// @flow
import React, { Component } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";
import moment from 'moment';
import Modal from 'react-modal';

import IWeight from '../../../../../common/icons/weight.svg';
import IHeight from '../../../../../common/icons/height.svg';
import IEdit from '../../../../../common/icons/edit.svg';

import { Header, Button } from "web/elements";

//Modal.setAppElement(appElement);

type Props = {

};

const Main = styled(Flex)`
  height: 250px;
  padding: 20px;
  background: url(${props => props.image});
  background-size:cover;
  background-position:bottom;
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
  
  >* {
    z-index: 1
  }
`;

const EditPhotosButton = styled(Flex)`
  border: none;
  font-size: 12px;
  color: ${props => props.theme.colors.white};
  margin: 0 0 0 auto;
  align-self: flex-start;
  cursor: pointer;
  
  >svg {
    margin: 0 0 10px;
  }
`;

const BabyImage = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  border: 8px solid ${props => props.theme.colors.white};
  border-radius: 100%;
  background: url(${props => props.image});
  background-size:cover;
  background-position:center;
`;

const BabyInfo = styled(Flex)`
  align-items: center;
`;

const BabyName = styled.h2`
  color: white;
  text-shadow: 0 1px 4px rgba(0,0,0, .26);
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
  border-bottom: 1px solid ${props => props.theme.colors.open.white2}
`;

const FooterItem = styled(Flex)`
  padding: 5px 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  
  >* {
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

const EditProfileButton = styled(Box)`
  
`;

const PhotoActionsList = styled.ul`
  min-width: 130px;
  padding: 0;
  margin: 15px 0 0 0;
  list-style: none;
  background: ${props => props.theme.colors.white};
  border-radius: 4px;
  overflow: hidden; 
`;

const PhotoActionsListItem = styled.li`
  padding: 5px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.open.gray3};
  color: ${props => props.theme.colors.open.gray3};
  cursor: pointer;
`;


class ProfileHeader extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { coverImage, avatar, dob, name, weight, height } = this.props;

    return (
      <Box width={1} is={Header}>
        <Main image={coverImage.url} align="flex-end" className="ProfileHeaderMain">
          <BabyImage image={avatar.url}/>

          <BabyInfo>
            <BabyName>{name}</BabyName>
            <BabyDoB>{moment(dob).fromNow(true)} old</BabyDoB>
          </BabyInfo>

          <EditPhotosButton align="center" justify="space-between" direction="column" onClick={this.openModal}>
            <IEdit />
            Edit photos
          </EditPhotosButton>

          <Modal
            style={{
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
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                background: 'none',
                border: 'none',
                color: 'white'
              }
            }}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Edit Photo Menu"
            parentSelector={() => document.querySelector('.ProfileHeaderMain')}
          >
            <div>Change cover photo</div>
            <PhotoActionsList>
              <PhotoActionsListItem>Upload photo</PhotoActionsListItem>
              <PhotoActionsListItem>Remove</PhotoActionsListItem>
              <PhotoActionsListItem onClick={this.closeModal}>Cancel</PhotoActionsListItem>
            </PhotoActionsList>
          </Modal>
        </Main>

        <Footer justify="flex-start" align="center" p={15}>
          <FooterItem><IWeight/> <Label>Weight:</Label> <span><Count>{weight}</Count><Measure>kg</Measure></span></FooterItem>
          <Separator/>
          <FooterItem><IHeight/> <Label>Height:</Label> <span><Count>{height}</Count><Measure>cm</Measure></span></FooterItem>

          <EditProfileButton ml="auto" is={Button}>Edit profile</EditProfileButton>
        </Footer>
      </Box>
    );
  }
}

export default ProfileHeader;
