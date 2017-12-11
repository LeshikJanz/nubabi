// @flow
import type { Baby } from 'core/types';
import type { State, Dispatch } from 'web/types';
import React from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import path from 'ramda/src/path';
import 'sanitize.css/sanitize.css';
import { logout } from 'core/auth/actions';
import { Section } from 'web/elements';
import {
  Loader,
  Header,
  GlobalLoader,
  Home,
  About,
  AuthenticatedRoute,
  Test,
  NotFound,
} from 'web/components';
import { Login, SignUp } from 'web/auth';
import NavBar from '../components/Navbar';
import Stimulation from 'web/bundles/stimulation/containers';
import Growth from 'web/bundles/growth';
import Library from 'web/bundles/library';
import Memories from 'web/bundles/memories';
import Activity from 'web/bundles/stimulation/containers/activity';
import BrowseActivities from 'web/bundles/stimulation/containers/browseActivities';
import Favorites from '../bundles/stimulation/containers/favorites';
import History from '../bundles/stimulation/containers/history';
import FilteredSkillActivities from '../bundles/stimulation/containers/filteredSkillActivities';
import FilteredCategoryActivities from '../bundles/stimulation/containers/filteredCategoryActivities';
import HistoryList from '../bundles/stimulation/containers/history/historyList';
import Settings from 'web/settings';

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ 'web/bundles/profile'),
  loading() {
    return <Loader active />;
  },
});

type Props = {
  isLoading: boolean,
  pathname: string,
  logout: Function,
  isAuthenticated: boolean,
  baby: Baby,
};

const Wrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  background: ${props => props.theme.bg.panel};
  padding-bottom: 50px;
`;

const AppContent = styled(Section)`
  min-width: 768px;
  margin: 0 auto;
  margin-top: 2px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const App = (props: Props) => (
  <Wrapper>
    <GlobalLoader active={props.isLoading} />
    <Header
      pathname={props.pathname}
      isAuthenticated={props.isAuthenticated}
      logout={props.logout}
      baby={props.baby}
    />
    <AppContent>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <AuthenticatedRoute
          path="/settings"
          component={Settings}
          props={props}
        />
        <NavBar {...props}>
          <AuthenticatedRoute path="/test" component={Test} props={props} />
          <AuthenticatedRoute
            path="/profile"
            component={Profile}
            props={props}
          />
          <AuthenticatedRoute path="/growth" component={Growth} props={props} />
          <AuthenticatedRoute
            exact
            path="/stimulation"
            component={Stimulation}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/activity/:id"
            component={Activity}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/favorites"
            component={Favorites}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/browse"
            component={BrowseActivities}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/history"
            component={History}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/history/:id"
            component={HistoryList}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/browse/skill/:id"
            component={FilteredSkillActivities}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/stimulation/browse/category/:id"
            component={FilteredCategoryActivities}
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
  globalLoader,
  auth,
  navigation,
  babies,
  settings,
}: State) => ({
  isLoading: globalLoader.isFetching,
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
