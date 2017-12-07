// @flow
import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

type Props = {
  options?: Array<mixed>,
  name?: string,
  fieldPlaceholder?: string,
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const RelationshipSelector = styled(Select)`
  background-color: red;
  font-family: sans-serif;
  font-weight: 300;

  & .Select-control {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #eee;
    height: 30px;

    & > *:last-child {
      padding-right: 0;
    }
  }

  & .Select-input {
    height: 25px;
  }

  & .Select-placeholder {
    padding-left: 0;
    padding-right: 0;
    line-height: 30px;
  }

  & .Select-arrow-zone {
    vertical-align: bottom;
    bottom: 3px;
  }
`;

const Label = styled.span`
  color: #ccc;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

export const Selector = ({ fieldPlaceholder, options, name }: Props) => {
  return (
    <InputContainer>
      <Label>{fieldPlaceholder ? fieldPlaceholder.toUpperCase() : ''}</Label>
      <RelationshipSelector
        options={options && options.length ? options : []}
        name={name && name.length ? name : 'selector'}
      />
    </InputContainer>
  );
};

export default Selector;
