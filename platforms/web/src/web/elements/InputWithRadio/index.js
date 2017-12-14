// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { RadioForInput, TextInput } from 'web/elements';
import { Field } from 'redux-form';

type Props = {
  placeholder?: string,
  variants?: Array<mixed>,
  type: string,
  name: string,
  radioName: string,
  inputValidate: string[],
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  position: relative;

  .radioInput {
    width: 75%;
  }
`;

const Label = styled.span`
  color: ${props => props.theme.colors.grey};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

const InputWithRadio = ({
  placeholder,
  variants,
  type,
  name,
  radioName,
  inputValidate,
}: Props) => (
  <InputContainer>
    <Label>{placeholder ? placeholder.toUpperCase() : ''}</Label>
    <Field
      component={TextInput}
      className="radioInput"
      name={name}
      type={type || 'text'}
      validate={inputValidate}
    />
    <Field
      component={RadioForInput}
      name={radioName}
      variants={variants}
      disabled
    />
  </InputContainer>
);

export default InputWithRadio;
