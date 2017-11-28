// @flow
import React from 'react';
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
import NavBar from '../components/Navbar';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';

import 'sanitize.css/sanitize.css';

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ 'web/bundles/profile'),
  loading() {
    return <Loader active />;
  },
});

import Stimulation from 'web/bundles/stimulation/containers';
import { Baby } from 'core/types/modelTypes';
import Growth from 'web/bundles/growth';
import Library from 'web/bundles/library';
import Memories from 'web/bundles/memories';

type Props = {
  isLoading: boolean,
  pathname: string,
  logout: Function,
  isAuthenticated: boolean,
  baby: Baby,
  setBabyToStore: Function,
};

const Wrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  background: ${props => props.theme.bg.panel};
  padding-bottom: 50px;
`;

const AppContent = styled(Section)`
  max-width: 1400px;
  min-width: 768px;
  margin: 0 auto;
  margin-top: 2px;
`;

const App = (props: Props) => (
  <Wrapper>
    <Loader active={props.isLoading} />
    <Header
      pathname={props.pathname}
      isAuthenticated={props.isAuthenticated}
      logout={props.logout}
      baby={props.baby}
    />
    <AppContent>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <NavBar {...props}>
          <AuthenticatedRoute path="/test" component={Test} props={props} />
          <AuthenticatedRoute
            path="/profile"
            component={Profile}
            props={props}
          />
          <AuthenticatedRoute path="/growth" component={Growth} props={props} />
          <AuthenticatedRoute
            path="/stimulation"
            component={Stimulation}
            props={props}
          />
          <AuthenticatedRoute
            path="/library"
            component={Library}
            props={props}
          />
          <AuthenticatedRoute
            path="/memories"
            component={Memories}
            props={props}
          />
        </NavBar>
        <Route path="*" component={NotFound} />
      </Switch>
    </AppContent>
  </Wrapper>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

const mapStateToProps = ({
  app,
  auth,
  navigation,
  babies,
  settings,
}: State) => ({
  isLoading: app.isFetching,
  pathname: navigation.location.pathname,
  isAuthenticated: auth.isAuthenticated,
  currentBabyId: babies.currentBabyId,
  unitDisplay: settings.unitDisplay,
});

const query = gql`
  query getBaby($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        name
        avatar {
          url
        }
        coverImage {
          url
        }
        name
        weight
        height
      }
    }
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
)(App);
