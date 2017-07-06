// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import FriendsHeader from './FriendsHeader';
import FriendsList from './FriendsList';

export class FriendsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Family & Friends',
  };

  render() {
    return (
      <Screen>
        <FriendsHeader />
        <FriendsList />
      </Screen>
    );
  }
}

export default FriendsScreen;
