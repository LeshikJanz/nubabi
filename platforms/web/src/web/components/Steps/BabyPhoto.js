import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import BabyPhotoImg from 'web/assets/images/baby_photo.png';

const BabyPhotoBox = styled(Flex)`
  width: 60px;
  height: 60px;
  border: 2px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.panel};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Photo = styled.img`
  transform: scale(0.3);
`;

const BabyPhoto = () => {
  return (
    <BabyPhotoBox>
      <Photo src={BabyPhotoImg} />
    </BabyPhotoBox>
  );
};

export default BabyPhoto;
