import { Flex } from 'grid-styled';
import { Button } from 'web/elements';
import styled from 'styled-components';
import PhotoIcon from 'web/assets/images/icons/camera.svg';

export const ProfileDetailsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 30px;
`;

export const Title = styled.h3`
  font-weight: 300;
  font-size: 18px;
  margin: 0;
`;

export const ButtonBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

export const SaveButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-weight: 300;
  border: none;
`;

export const AvatarContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const Image = styled(Flex)`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
`;

export const EditBtn = styled(Flex)`
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

export const CameraIcon = styled(PhotoIcon)`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 3px;
  width: 65%;
  height: 65%;
`;
