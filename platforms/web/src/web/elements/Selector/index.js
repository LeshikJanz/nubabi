// @flow
import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Field } from 'redux-form';

type Props = {
  options?: Array<mixed>,
  name?: string,
  placeholder?: string,
};

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  &:focus {
    outline: none;
  }
`;

const RelationshipSelector = styled(Select)`
  font-family: sans-serif;
  font-weight: 300;

  &: focus {
    outline: none;
  }

  &.is-focused:not(.is-open) > .Select-control {
    border-color: transparent;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    box-shadow: none;
  }

  & .Select-control {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${props => props.theme.colors.border};
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

  & .Select-value {
    padding-left: 0 !important;

    &:focus {
      outline: none;
    }
  }
`;

const Label = styled.span`
  color: ${props => props.theme.colors.gray};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

export const Selector = ({ placeholder, options, name }: Props) => {
  const reactSelect = ({ input }: *) => (
    <RelationshipSelector
      {...input}
      clearable={false}
      value={input.value}
      onChange={value => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      options={options}
      searchable={false}
    />
  );

  return (
    <InputContainer>
      <Label>{placeholder ? placeholder.toUpperCase() : ''}</Label>
      <Field
        name={name}
        component={reactSelect}
        options={options && options.length ? options : []}
      />
    </InputContainer>
  );
};

export default Selector;
