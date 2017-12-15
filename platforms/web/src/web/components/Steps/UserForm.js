// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import FaceBookSignUp from './FaceBookSignUp';
import UserCredentialsSignUp from './UserCredentialsSignUp';
import OrElem from './OrElem';

type Props = {
  onClickSignup: Function,
  inputs: Array<mixed>,
};

const UserDataInputContainer = styled(Flex)`
  background-color: white;
  flex-direction: row;
  border-radius: 4px;
  box-shadow: 0 1px 9px -1px ${props => props.theme.colors.gray};
  overflow: hidden;
  height: 334px;
  position: relative;
  margin: 35px 0px 20px 0;
`;

/* eslint-disable import/no-mutable-exports */
let UserCredentialsForm = ({ onClickSignup, inputs }: Props) => (
  <UserDataInputContainer>
    <OrElem />
    <FaceBookSignUp onClickSignup={onClickSignup} />
    <UserCredentialsSignUp inputs={inputs} />
  </UserDataInputContainer>
);

UserCredentialsForm = reduxForm({
  form: 'UserCredentialsForm',
})(UserCredentialsForm);

export default UserCredentialsForm;
