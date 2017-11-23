// @flow
import type { Element } from 'react';
import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Label from './Label';
import Field from './Field';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';

const StyledForm = styled.form``;

type Props = {
  onSubmit: Function,
  children: Element<*>,
}

class Form extends Component<Props> {
  static Field = Field;
  static Input = Input;
  static Label = Label;
  static PasswordInput = PasswordInput;
  static TextInput = TextInput;
  static SubmitButton = SubmitButton;
  static ClearButton = ClearButton;

  render() {
    return (
      <StyledForm onSubmit={this.props.onSubmit}>
        {this.props.children}
      </StyledForm>
    );
  }
}

export default Form;
