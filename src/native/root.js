// @flow
import type { NavigationProp, State } from '../common/types';
import type { Dispatch } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

type Props = {
  navigation: NavigationProp,
  dispatch: Dispatch<*>,
};

const Root = ({ dispatch, navigation }: Props) => {
  const nav = addNavigationHelpers({
    dispatch,
    state: navigation,
  });

  return <AppNavigator navigation={nav} />;
};

export default connect((state: State) => {
  return {
    navigation: state.navigation,
    isAuthenticated: state.auth.isAuthenticated,
    appStarted: state.app.started,
    appOnline: state.app.online,
  };
})(Root);
