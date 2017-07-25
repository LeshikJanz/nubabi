// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { State, Dispatch } from "web/types";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { Section } from "web/elements";
import Components from "../../components";
import { containers as authContainers } from "web/auth";
import { logout } from "common/auth/actions";

import "sanitize.css/sanitize.css";

type Props = {
  isLoading: boolean,
  pathname: string,
  authToken: string
};

const Wrapper = styled.div`
  padding: 10px;
  font-family: ${props => props.theme.text.fontFamily};
`;

export class App extends Component {
  props: Props;

  render() {
    return (
      <Wrapper>
        <Components.Loader active={this.props.isLoading} />
        <Components.Header
          pathname={this.props.pathname}
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.logout}
        />
        <Section>
          <Route path="/" exact component={Components.Home} />
          <Route path="/about" component={Components.About} />
          <Route path="/login" component={authContainers.Login} />
          <Components.AuthenticatedRoute
            path="/test"
            component={Components.Test}
            props={this.props}
          />
        </Section>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout());
  }
});

const mapStateToProps = ({ app, auth, navigation }: State) => {
  return {
    isLoading: app.isFetching,
    pathname: navigation.location.pathname,
    isAuthenticated: auth.isAuthenticated
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
