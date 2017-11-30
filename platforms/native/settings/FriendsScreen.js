// @flow
import React, { PureComponent } from 'react';
import { Screen } from '../components';
import FriendsHeader from './FriendsHeader';
import FriendsList from './FriendsList';

type Props = {
  navigation: NavigationProp<*>,
};

export class FriendsScreen extends PureComponent<Props> {
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
