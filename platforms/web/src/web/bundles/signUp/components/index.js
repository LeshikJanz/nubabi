import React from 'react';
import { SignupStepImg } from 'web/elements';
import { Steps } from 'web/components';
import SignupStepsImg from 'web/assets/images/signup_steps.png';
import { SignUpContainer } from '../styled';

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
