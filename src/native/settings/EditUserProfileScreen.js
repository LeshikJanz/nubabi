// @flow
import React, { PureComponent } from 'react';
import { Screen, SubmitFormNavButton } from '../components';
import EditUserProfile from './EditUserProfile';

export class EditUserProfileScreen extends PureComponent {
  static navigationOptions = {
    title: 'Edit Your Profile',
    headerRight: <SubmitFormNavButton form="user" />,
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
