// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import Login from './Login';

export class LoginScreen extends PureComponent {
  static navigationOptions = {
    headerVisible: false,
  };

  render() {
    return (
      <Screen>
        <Login />
      </Screen>
    );
  }
}

export default LoginScreen;
