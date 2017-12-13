// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

type Props = {
  variants: Array<mixed>,
  name: string,
  input: { onChange: Function, value: string },
};

const RadioContainer = styled(Flex)`
  position: absolute;
  right: 0;
  bottom: 10px;
`;

const Variant = styled(Flex)``;

const Radio = styled.input`
  display: none;
  &:checked {
    + label {
      background-color: ${props => props.theme.colors.border};
      color: ${props => props.theme.colors.label};
      font-weight: 400;
    }
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 45px;
  height: 23px;
  color: ${props => props.theme.colors.gray};
  font-weight: 300;
  font-family: sans-serif;
  cursor: pointer;
  font-size: 12px;
  padding-top: 1px;
`;

const renderVariant = (variant, name, input) => (
  <Variant key={variant}>
    <Radio
      onChange={() => input.onChange(variant)}
      checked={input.value === variant}
      id={variant}
      name={name}
      type="radio"
      value={variant}
    />
    <Label htmlFor={variant}>{variant}</Label>
  </Variant>
);

const RadioForInput = ({ variants, name, input }: Props) => (
  <RadioContainer>
    {variants &&
      variants.length &&
      variants.map(variant => renderVariant(variant, name, input))}
  </RadioContainer>
);

export default RadioForInput;
