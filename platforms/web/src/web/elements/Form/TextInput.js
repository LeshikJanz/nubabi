// @flow
import React from 'react';
import Input from '../Input';

type Props = {
  name: string,
  placeholder: string,
  validate: mixed,
};

export const TextInput = ({ name, placeholder, validate }: Props) => (
  <Input
    name={name}
    type="text"
    placeholder={placeholder}
    validate={validate}
  />
);

export default TextInput;
