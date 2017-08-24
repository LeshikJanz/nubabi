// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import InviteUser from './InviteUser';

export class InviteUserScreen extends PureComponent {
  static navigationOptions = {
    title: 'Add Family & Friends',
  };

  render() {
    return (
      <Screen>
        <InviteUser />
      </Screen>
    );
  }
}

export default InviteUserScreen;
