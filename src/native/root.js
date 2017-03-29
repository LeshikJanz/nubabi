import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';

const Root = ({ dispatch, navigation }: Props) => {
  const nav = addNavigationHelpers({
    dispatch,
    state: navigation,
  });

  return (
    <AppNavigator navigation={nav} />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    isAuthenticated: state.auth.isAuthenticated,
    appStarted: state.app.started,
    appOnline: state.app.online,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
