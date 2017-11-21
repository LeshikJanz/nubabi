// @flow
import type { NavigationProp, State } from '../common/types';
import type { Dispatch } from 'redux';
import React from 'react';
import { View } from 'react-native';
import Orientation from 'react-native-orientation';
import Alert from './components/Alert';
import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import NetworkIndicator from './components/NetworkIndicator';

type Props = {
  navigation: NavigationProp,
  dispatch: Dispatch<*>,
};

const Root = ({ dispatch, navigation }: Props) => {
  const nav = addNavigationHelpers({
    dispatch,
    state: navigation,
  });

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <AppNavigator navigation={nav} />
      <Alert />
      <NetworkIndicator />
    </View>
  );
};

export default compose(
  lifecycle({
    componentDidMount: () => {
      Orientation.lockToPortrait();
    },
  }),
  // $FlowFixMe$
  connect((state: State) => ({
    navigation: state.navigation,
    isAuthenticated: state.auth.isAuthenticated,
    appStarted: state.app.started,
    appOnline: state.app.online,
  })),
)(Root);
