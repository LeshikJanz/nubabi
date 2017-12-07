// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

type Props = {
  title: string,
  image: any,
  subtitle: string,
};

const SubTitle = styled.span`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.lightBlue};
  height: 40px;
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: SFUIText-Regular, sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 20px;
  letter-spacing: 0.5px;
  padding-top: 2px;
`;

const Title = styled.h1`
  color: white;
  max-width: 410px;
  font-weight: 300;
  font-family: SFUIText-Regular, sans-serif;
  text-align: center;
  text-shadow: 0 0 11px ${props => props.theme.colors.secondary};
  letter-spacing: 2px;
  margin-bottom: 30px;
`;

const ImageContainer = styled(Flex)`
  height: 350px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  flex-direction: column;
  padding-top: 20px;
  background-position: center;
  position: relative;
  background-color: ${props => props.theme.colors.secondary};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    background-image: url(${props => props.image});
  }
`;

const SignupStepImg = ({ title, image, subtitle }: Props) => {
  return (
    <ImageContainer image={image}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </ImageContainer>
  );
};

export default SignupStepImg;
