// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { State, Dispatch } from "web/types";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { Section } from "web/elements";
import Components from "../../components";

import "sanitize.css/sanitize.css";

type Props = {
  isLoading: boolean,
  pathname: string,
  authToken: string
};

const Wrapper = styled.div`
  padding: 10px;
  font-family: ${props => props.theme.font.family};
`;

export class App extends Component {
  props: Props;

  render() {
    return (
      <Wrapper>
        <Components.Loader active={this.props.isLoading} />
        <Components.Header
          pathname={this.props.pathname}
          isLoggedIn={this.props.isLoggedIn}
          logout={this.props.logout}
        />
        <Section>
          <Route path="/" exact component={Components.Home} />
          <Route path="/about" component={Components.About} />
          <Components.AuthenticatedRoute
            path="/estimation"
            component={Components.Home}
            props={this.props}
          />
        </Section>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = ({ app, router, auth }: State) => ({
  isLoading: app.isFetching,
  pathname: router.location.pathname,
  isLoggedIn: auth.isLoggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
