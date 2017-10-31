// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import EditUserProfile from './EditUserProfile';
import SaveUserProfileButton from './SaveUserProfileButton';

export class EditUserProfileScreen extends PureComponent {
  static navigationOptions = {
    title: 'Edit Your Profile',
    headerRight: <SaveUserProfileButton />,
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
