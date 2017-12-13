// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

type Props = {
  babyRadio: mixed,
  input: { onChange: Function, value: string },
};

const BabyRadioBox = styled(Flex)`
  width: 100%;
  max-width: 215px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Radio = styled.input`
  display: none;
  &:checked {
    + label {
      background-color: ${props => props.theme.colors.border};
      color: ${props => props.theme.colors.black};
      font-weight: 400;
    }
  }
`;

const Label = styled.label`
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100px;
  height: 35px;
  color: ${props => props.theme.colors.gray};
  text-transform: uppercase;
  font-weight: 300;
  font-family: sans-serif;
  cursor: pointer;
  font-size: 12px;
  padding-top: 2px;
`;

const Variant = styled(Flex)``;

const renderRadio = (variant, input) => (
  <Variant key={variant}>
    <Radio
      onChange={() => input.onChange(variant)}
      checked={input.value === variant}
      id={variant}
      name="babyRadio"
      type="radio"
      value={variant}
    />
    <Label htmlFor={variant}>{variant}</Label>
  </Variant>
);

const BabyRadio = ({ babyRadio, input }: Props) => (
  <BabyRadioBox>
    {babyRadio.variants.map(variant => renderRadio(variant, input))}
  </BabyRadioBox>
);

export default BabyRadio;
