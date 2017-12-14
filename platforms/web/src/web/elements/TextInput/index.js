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
      : props.theme.colors.grey};
`;

const Input = styled.input`
  border-width: 0;
  border-bottom: 1px solid
    ${props =>
      props.touched && (props.error || props.warning)
        ? props.theme.colors.open.red1
        : props.theme.colors.border};
  color: ${props => props.theme.colors.grey};
  padding: 5px 0 5px 0;
  font-weight: 300;

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

const TextInput = (props: Props) => {
  const { placeholder, help, input, type } = props;
  return (
    <InputContainer>
      <Label>{placeholder ? placeholder.toUpperCase() : ''}</Label>
      <Input {...input} type={type || 'text'} />
      {help ? renderHelp(help) : null}
    </InputContainer>
  );
};

export default TextInput;
