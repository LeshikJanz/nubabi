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

const InputWithRadio = ({
  placeholder,
  variants,
  type,
  name,
  radioName,
  inputValidate,
}: Props) => (
  <InputContainer>
    <Field
      component={TextInput}
      className="radioInput"
      name={name}
      type={type || 'text'}
      placeholder={placeholder ? placeholder.toUpperCase() : ''}
      validate={inputValidate}
    />
    <Field component={RadioForInput} name={radioName} variants={variants} />
  </InputContainer>
);

export default InputWithRadio;
