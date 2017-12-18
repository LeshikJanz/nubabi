// @flow
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button } from 'web/elements';
import { Helmet } from 'react-helmet';
import { parse } from 'qs';
import { Wrapper, UserDataInputContainer } from '../styled';
import LoginForm from './LoginForm';
// import styled from 'styled-components';
// import { Flex } from 'grid-styled';
import OrElem from '../../../components/Steps/OrElem';
import FaceBookSignUp from '../../../components/Steps/FaceBookSignUp';

type LoginProps = {
  handleSubmit: () => void,
  pristine: boolean,
  reset: Function,
  submitting: boolean,
  login: () => void,
  location: Object,
  isAuthenticated: boolean,
};

const Login = (props: LoginProps) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    login,
    location,
    isAuthenticated,
  } = props;
  const handleFormSubmit = ({ username, password }) =>
    login(username, password);
  const { search } = location;
  let redirect;
  if (search.startsWith('?')) {
    const searchs = search.substring(1);
    const params = parse(searchs);
    if (params.redirect && params.redirect.length > 0)
      // eslint-disable-next-line prefer-destructuring
      redirect = params.redirect;
  }
  const doRedirect = redirect !== undefined && isAuthenticated;
  return doRedirect ? (
    <Redirect to={redirect} />
  ) : (
    <Wrapper>
      <Helmet>
        <title>Nubabi | Login</title>
      </Helmet>

      <UserDataInputContainer>
        <OrElem />
        <FaceBookSignUp onClickSignup={() => {}} />
        <LoginForm
          handleSubmit={handleSubmit(handleFormSubmit)}
          pristine={pristine}
          submitting={submitting}
          reset={reset}
        />
      </UserDataInputContainer>

      <Button>
        <Link to="/signup">Sign Up</Link>
      </Button>
    </Wrapper>
  );
};

export default Login;
