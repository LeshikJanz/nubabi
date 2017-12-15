// @flow
import * as React from 'react';
import { AvatarContainer, Image, EditBtn, CameraIcon } from '../styled';

type Props = {
  image: string,
};

const Avatar = ({ image }: Props) => {
  return (
    <AvatarContainer>
      <Image image={image}>
        <EditBtn>
          <CameraIcon />
        </EditBtn>
      </Image>
    </AvatarContainer>
  );
};

export default Avatar;
