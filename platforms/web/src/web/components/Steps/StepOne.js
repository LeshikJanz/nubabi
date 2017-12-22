// @flow
import type { registerStepOneInputsType } from 'web/constants';
import React from 'react';
import { Section, Button } from 'web/elements';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import UserCredentialsForm from './UserForm';

type Props = {
  onNexStep: Function,
  onClickSignup: Function,
  inputs: registerStepOneInputsType,
};

export const StepContainer = styled(Section)`
  width: 100%;
  max-width: 1166px;
`;

export const StepTitle = styled.h1`
  font-size: 22px;
  font-family: sans-serif;
  font-weight: 300;
  color: ${props => props.theme.colors.gray};
  margin-top: 65px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.span`
  font-family: sans-serif;
  color: ${props => props.theme.colors.gray};
  font-weight: 300;
  font-size: 15px;
`;

export const ButtonContainer = styled(Flex)`
  justify-content: flex-end;
`;

export const Red = styled.span`
  color: ${props => props.theme.colors.primary};
`;

export const RedButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  font-weight: 300;
  letter-spacing: 0.5px;
  padding: 7px 20px;
  outline: none;

  &:disabled {
    background-color: ${props => props.theme.colors.lightgrey};
    color: ${props => props.theme.colors.gray};
  }
`;

const StepOne = ({ onNexStep, onClickSignup, inputs }: Props) => (
  <StepContainer>
    <StepTitle>
      <Red>Step 1:</Red> Create your free account
    </StepTitle>
    <SubTitle>Complete our quick sign up below</SubTitle>
    <UserCredentialsForm onClickSignup={onClickSignup} inputs={inputs} />
    <ButtonContainer>
      <RedButton onClick={onNexStep} type="primary">
        next
      </RedButton>
    </ButtonContainer>
  </StepContainer>
);

export default StepOne;
