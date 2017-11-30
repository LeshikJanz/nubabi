// @flow
import * as React from 'react';
import Input from '../Input';

export const PasswordInput = ({ name, placeholder }: Props) => (
  <Input name={name} type="password" placeholder={placeholder} />
);

export default PasswordInput;
