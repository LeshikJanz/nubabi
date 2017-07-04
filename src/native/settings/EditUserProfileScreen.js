// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import EditUserProfile from './EditUserProfile';

export class EditUserProfileScreen extends PureComponent {
  static navigationOptions = {
    title: 'Edit Your Profile',
  };

  render() {
    return (
      <Screen>
        <EditUserProfile />
      </Screen>
    );
  }
}

export default EditUserProfileScreen;
