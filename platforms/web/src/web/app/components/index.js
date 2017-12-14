// @flow
import React from 'react';
import type { Baby } from 'core/types';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import {
  Loader,
  Header,
  Home,
  About,
  AuthenticatedRoute,
  Test,
  NotFound,
  GlobalLoader,
} from 'web/components';
import { Login, SignUp } from 'web/auth';
import NavBar from 'web/components/Navbar';
import Stimulation from 'web/bundles/stimulation/containers';
import Growth from 'web/bundles/growth';
import Library from 'web/bundles/library';
import Memories from 'web/bundles/memories';
import Settings from 'web/bundles/settings';
import Activity from 'web/bundles/stimulation/containers/activity';
import BrowseActivities from 'web/bundles/stimulation/containers/browseActivities';
import Favorites from 'web/bundles/stimulation/containers/favorites';
import History from 'web/bundles/stimulation/containers/history';
import FilteredSkillActivities from 'web/bundles/stimulation/containers/filteredSkillActivities';
import FilteredCategoryActivities from 'web/bundles/stimulation/containers/filteredCategoryActivities';
import HistoryList from 'web/bundles/stimulation/containers/history/historyList';
import { Wrapper, AppContent } from '../styled';
import WeekActivities from '../../bundles/stimulation/containers/weekActivities';
import BabyProfile from '../../bundles/babyProfile/containers';

type Props = {
  isLoading: boolean,
  pathname: string,
  logout: Function,
  isAuthenticated: boolean,
  baby: Baby,
};

const Profile = Loadable({
  loader: () => import('web/bundles/profile'),
  loading() {
    return <Loader active />;
  },
});

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
            path="/stimulation"
            component={Stimulation}
            props={props}
          />
          <AuthenticatedRoute
            path="/stimulation/weeks"
            component={WeekActivities}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/activity/:id"
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
            path="/history/:id"
            component={HistoryList}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/browse/skill/:id"
            component={FilteredSkillActivities}
            props={props}
          />
          <AuthenticatedRoute
            exact
            path="/browse/category/:id"
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
          <AuthenticatedRoute
            path="/babyprofile/:id"
            component={BabyProfile}
            props={props}
          />
        </NavBar>
        <Route path="*" component={NotFound} />
      </Switch>
    </AppContent>
  </Wrapper>
);

export default App;
