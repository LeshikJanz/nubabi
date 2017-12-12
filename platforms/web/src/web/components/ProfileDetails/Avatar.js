// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import AvatarImg from 'core/images/avatar.png';
import PhotoIcon from 'web/assets/images/icons/camera.svg';

const AvatarContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Image = styled(Flex)`
  position: relative;
`;

const Img = styled.img``;

const EditBtn = styled(Flex)`
  position: absolute;
  height: 40px;
  width: 40px;
  border: 3px solid white;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.label};
  bottom: -5px;
  right: -5px;
`;

const CameraIcon = styled(PhotoIcon)`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 3px;
  width: 65%;
  height: 65%;
`;

const Avatar = () => {
  return (
    <AvatarContainer>
      <Image>
        <Img src={AvatarImg} />
        <EditBtn>
          <CameraIcon />
        </EditBtn>
      </Image>
    </AvatarContainer>
  );
};

export default Avatar;
