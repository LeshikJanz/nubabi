import React from 'react';
import styled from 'styled-components';
import { SignupStepImg, Section } from 'web/elements';
import { Steps } from 'web/components';
import SignupStepsImg from 'web/assets/images/signup_steps.png';

const SignUpContainer = styled(Section)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SignUp = () => {
  return (
    <SignUpContainer>
      <SignupStepImg
        image={SignupStepsImg}
        subtitle="No credit card required"
        title="Get your 2 week free trial in just 2 easy steps"
      />
      <Steps />
    </SignUpContainer>
  );
};

export default SignUp;
