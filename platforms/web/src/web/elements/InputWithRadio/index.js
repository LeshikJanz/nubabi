// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { RadioForInput } from 'web/elements';

type Props = {
  placeholder?: string,
  value?: string,
  variants?: Array<mixed>,
  unitsRadioName: string,
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

const InputWithRadio = ({
  placeholder,
  value,
  variants,
  unitsRadioName,
}: Props) => {
  return (
    <InputContainer>
      <Label>{placeholder ? placeholder.toUpperCase() : ''}</Label>
      <Input type="text" value={value} onChange={() => {}} />
      <RadioForInput variants={variants} unitsRadioName={unitsRadioName} />
    </InputContainer>
  );
};

export default InputWithRadio;
