// @flow
import React from 'react';
import Field from 'redux-form/es/Field';
import InputWithError from '../InputWithError';

type InputFieldProps = {
  name: string,
  type: string,
  placeholder: string,
  value: mixed,
  input: mixed,
};

type Props = InputFieldProps & {
  validate: mixed,
};

const InputField = ({ input, type, placeholder }: InputFieldProps) => (
  <input {...input} type={type} placeholder={placeholder} />
);

export const Input = ({ name, type, placeholder, validate, value }: Props) => {
  let component = InputField;
  if (validate != null) {
    component = InputWithError;
  }
  return (
    <Field
      component={component}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      validate={validate}
    />
  );
};

export default Input;
