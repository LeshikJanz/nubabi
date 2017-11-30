// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  input: mixed,
  placeholder: string,
  type: string,
  meta: {
    touched: boolean,
    error: boolean,
    warning: boolean,
  },
};

const Error = styled.span``;

const Warning = styled.span``;

export const InputWithError = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning },
}: Props) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    {touched &&
      ((error && <Error>{error}</Error>) ||
        (warning && <Warning>{warning}</Warning>))}
  </div>
);

export default InputWithError;
