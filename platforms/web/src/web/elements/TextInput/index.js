// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import HelpIcon from 'web/assets/images/ic_help.svg';

type Props = {
  placeholder?: string,
  type?: string,
  input: { value?: string, type?: string, onChange: Function },
  help?: string,
  meta: {
    touched: boolean,
    error: boolean,
    warning: boolean,
  },
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  position: relative;

  span.hint {
    color: ${props => props.theme.colors.open.red1};
  }
`;

const Label = styled.span`
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
  color: ${props =>
    props.touched && (props.error || props.warning)
      ? props.theme.colors.open.red1
      : props.theme.colors.gray};
`;

const Input = styled.input`
  border-width: 0;
  border-bottom: 1px solid
    ${props =>
      props.touched && (props.error || props.warning)
        ? props.theme.colors.open.red1
        : props.theme.colors.border};
  color: ${props => props.theme.colors.open.label};
  padding: 5px 0 5px 0;
  font-weight: 300;
  font-family: SF Pro Text, sans-serif;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const HelpElem = styled(HelpIcon)`
  position: absolute;
  cursor: pointer;
  right: 0;
  bottom: 10px;
`;

const renderHelp = help => <HelpElem help={help} />;


const TextInput = ({
  placeholder,
  help,
  input,
  type,
  meta: { touched, error, warning },
}: Props) => (
  <InputContainer>
    <Label touched={touched} error={error} warning={warning}>
      {placeholder ? placeholder.toUpperCase() : ''}
    </Label>
    <Input
      {...input}
      type={type || 'text'}
      touched={touched}
      error={error}
      warning={warning}
    />
    {help ? renderHelp(help) : null}
    {touched &&
      ((error && <span className="hint">{error}</span>) ||
        (warning && <span className="hint">{warning}</span>))}
  </InputContainer>
);

export default TextInput;
