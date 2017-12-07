// @flow
import React from 'react';
import { Button } from 'web/elements';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import Pattern from 'web/assets/images/facebook_signup.png';

type Props = {
  onClickSignup: Function,
};

const FacebookSignupContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: ${props => props.theme.colors.danger};
  background-image: url(${Pattern});
  background-size: 100%;
  background-repeat: repeat;
`;

const FaceBookSignUp = ({ onClickSignup }: Props) => {
  return (
    <FacebookSignupContainer>
      <Button onClick={onClickSignup}>SIGN UP WITH FACEBOOK</Button>
    </FacebookSignupContainer>
  );
};

export default FaceBookSignUp;
