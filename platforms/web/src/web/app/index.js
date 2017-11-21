// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from 'web/types';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Section } from 'web/elements';
import {
  Loader,
  Header,
  Home,
  About,
  AuthenticatedRoute,
  Test,
  NotFound,
} from 'web/components';
import Login from 'web/auth';
import { logout } from 'core/auth/actions';

import 'sanitize.css/sanitize.css';

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ 'web/bundles/profile'),
  loading() {
    return <Loader active={true} />;
  },
});

type Props = {
  isLoading: boolean,
  pathname: string,
  authToken: string,
};

const Wrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  background: ${props => props.theme.bg.panel};
`;

const AppContent = styled(Section)`
  max-width: 1400px;
  min-width: 768px;
  margin: 0 auto;
`;

export class App extends Component<Props> {
  render() {
    return (
      <Wrapper>
        <Loader active={this.props.isLoading} />
        <Header
          pathname={this.props.pathname}
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.logout}
        />
        <AppContent>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <AuthenticatedRoute
              path="/test"
              component={Test}
              props={this.props}
            />
            <AuthenticatedRoute
              path="/profile"
              component={Profile}
              props={this.props}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </AppContent>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

const mapStateToProps = ({ app, auth, navigation }: State) => {
  return {
    isLoading: app.isFetching,
    pathname: navigation.location.pathname,
    isAuthenticated: auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
