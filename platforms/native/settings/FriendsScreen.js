// @flow
import React, { PureComponent } from 'react';
import { Screen, Box } from '../components';
import FriendsHeader from './FriendsHeader';
import FriendsList from './FriendsList';

export class FriendsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Family & Friends',
  };

  handleInvite = () => {
    this.props.navigation.navigate('inviteUser');
  };

  render() {
    return (
      <Screen>
        <FriendsHeader onAddPress={this.handleInvite} />
        <FriendsList />
      </Screen>
    );
  }
}

export default FriendsScreen;
