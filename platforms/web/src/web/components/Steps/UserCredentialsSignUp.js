// @flow
import React from 'react';
import { TextInput } from 'web/elements';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

type Props = {
  inputs: Array<mixed>,
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.span`
  color: ${props => props.theme.colors.gray};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

const UserCredentialsSignUpContainer = styled(Flex)`
  align-items: center;
  justify-content: space-around;
  width: 50%;
  flex-direction: column;
  padding: 30px 0;
`;

const renderInput = (input, i) => {
  return (
    <InputContainer key={i}>
      <Label>{input.placeholder.toUpperCase()}</Label>
      <TextInput inputType={input.type} value={input.value} />
    </InputContainer>
  );
};

const UserCredentialsSignUp = ({ inputs }: Props) => {
  return (
    <UserCredentialsSignUpContainer>
      {inputs.map((input, i) => renderInput(input, i))}
    </UserCredentialsSignUpContainer>
  );
};

export default UserCredentialsSignUp;
