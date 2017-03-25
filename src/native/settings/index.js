// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import type { NavigationProp } from 'react-navigation';
import type { Viewer } from '../../common/types';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';
import { NUBABI_RED } from '../../common/themes/defaultTheme';

type Props = {
  navigation: NavigationProp<*, *>,
  user: Viewer,
  logout: typeof logout,
};

class Settings extends Component {
  props: Props;

  static navigationOptions = {
    title: 'Settings',
  };

  logout = () => {
    this.props.logout();
    this.props.navigation.goBack();
  };

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>{user.email}</Text>
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          style={styles.oneButton}
          onPress={this.logout}
        >
          <View style={styles.submitButtonContainer}>
            <View style={styles.submitButton}>
              <Text style={styles.submitText}>LOG OUT</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  submitButtonContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
  submitButton: {
    backgroundColor: NUBABI_RED,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 15,
  },
  submitText: {
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  inputLabel: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
    marginTop: 50,
  },
});

export default connect(
  ({ viewer }) => ({ user: viewer }),
  { logout },
)(Settings);
