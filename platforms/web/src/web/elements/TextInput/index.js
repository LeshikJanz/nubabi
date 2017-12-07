// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import HelpIcon from 'web/assets/images/ic_help.svg';

type Props = {
  placeholder?: string,
  value?: string,
  inputType?: string,
  help?: string,
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const Label = styled.span`
  color: ${props => props.theme.colors.grey};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

const Input = styled.input`
  border-width: 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.grey};
  padding: 5px 0 5px 0;
  font-weight: 300;

  &:focus {
    outline: none;
  }
`;

const HelpElem = styled(HelpIcon)`
  position: absolute;
  cursor: pointer;
  right: 0;
  bottom: 10px;
`;

const renderHelp = help => <HelpElem help={help} />;

const TextInput = ({ placeholder, value, inputType, help }: Props) => {
  return (
    <InputContainer>
      <Label>{placeholder ? placeholder.toUpperCase() : ''}</Label>
      <Input
        type={inputType && inputType.length ? inputType : 'text'}
        value={value}
        onChange={() => {}}
      />
      {help ? renderHelp(help) : null}
    </InputContainer>
  );
};

export default TextInput;
