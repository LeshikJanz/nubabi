import React from "react";
import reduxForm from "redux-form/es/reduxForm";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Title } from "web/elements";
import { Helmet } from "react-helmet";
import { parse } from "qs";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import type { State, Dispatch } from "types";
import LoginForm from "web/auth/components/LoginForm";
import { loginRequest } from "common/auth/actions";

const Wrapper = styled.div`padding: 10px;`;

type LoginProps = {
  handleSubmit: () => void,
  pristine: boolean,
  reset: boolean,
  submitting: boolean,
  login: () => void,
  location: Object,
  isAuthenticated: boolean
};

export const Login = (props: LoginProps) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    login,
    location,
    isAuthenticated
  } = props;
  const handleFormSubmit = ({ username, password }) =>
    login(username, password);
  const { search } = location;
  let redirect;
  if (search.startsWith("?")) {
    const searchs = search.substring(1);
    const params = parse(searchs);
    if (params.redirect && params.redirect.length > 0)
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
      <Title>Login</Title>
      <LoginForm
        handleSubmit={handleSubmit(handleFormSubmit)}
        pristine={pristine}
        submitting={submitting}
        reset={reset}
      />
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (username, password) => {
    dispatch(loginRequest(username, password));
  }
});

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: "login"
    })(Login)
  )
);
