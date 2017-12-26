// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SortArrows = require('web/assets/images/icons/sort_arrows.svg');

type Props = {
  input: any,
  options: any,
  placeholder: string,
};

class AutoComplete extends Component<Props> {
  handleSelect = option => {
    this.props.input.onChange(option !== null ? option.value : null);
  };

  render() {
    return (
      <StyledSelect
        clearable
        searchable={false}
        arrowRenderer={({ onMouseDown }) => (
          <StyledSortArrows onMouseDown={onMouseDown} />
        )}
        options={this.props.options}
        value={this.props.input.value}
        onChange={this.handleSelect}
        placeholder={this.props.placeholder}
      />
    );
  }
}

const StyledSortArrows = styled(SortArrows)`
  width: 10px;
  height: 20px;
  fill: #000;
`;

const StyledSelect = styled(Select)`
  & .Select-control {
    border-radius: 3px;
    height: 30x;
    border: 1px solid #e8e8e8;
    color: #757575;
  }

  & .Select-input {
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    line-height: 18px;
  }

  & .Select-option {
    font-size: 14px;
    height: 40px;
    line-height: 18px;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }

  & .is-focused:not(.is-open) > .Select-control {
    border: 1px solid #e8e8e8;
    box-shadow: none;
  }

  & .Select-placeholder {
    font-size: 14px;
    font-weight: 500;
    padding: 0 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: #000;
  }

  & .Select-control:hover {
    box-shadow: none;
  }

  & .is-open > .Select-control {
    border: 1px solid #e8e8e8;
    box-shadow: none;
  }

  & .Select-menu-outer {
    border: 1px solid #e8e8e8;
  }

  & .Select-noresults {
    font-size: 14px;
  }

  & .Select-arrow-zone {
    padding-right: 12px;
  }

  & .is-open > .Select-control > .Select-arrow-zone > svg {
    transform: rotate(-180deg);
  }
`;

AutoComplete.defaultProps = {
  input: {
    value: '',
    onChange: () => {},
  },
};

export default AutoComplete;
