// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import type { Viewer } from '../../common/types';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/actions';
import { NUBABI_RED } from '../../common/themes/defaultTheme';
import theme from '../../common/themes/defaultTheme';

type Props = {
  user: Viewer,
  logout: typeof logout,
};

class Settings extends Component {
  props: Props;

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { user, appName, appVersion } = this.props;

    if (!user) {
      return null;
    }

    const copyright = appName
      && appVersion
      && `© ${new Date().getFullYear()} MyLearningBaby Ltd. ${appName} ${appVersion}`;

    return (
      <View style={styles.container}>
        <Text style={styles.inputLabel}>{user.email}</Text>
        <View style={styles.submitButtonContainer}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            style={styles.oneButton}
            onPress={this.props.logout}
          >

            <View style={styles.submitButton}>
              <Text style={styles.submitText}>LOG OUT</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>{copyright}</Text>
        </View>
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
  copyrightContainer: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    backgroundColor: theme.colors.open.white1,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 10,
    color: theme.colors.open.gray3,
    textAlign: 'center',
  },
});

export default connect(
  ({ viewer, navigation: { index }, config: { appName, appVersion } }) => ({
    user: viewer,
    routeIndex: index,
    appName,
    appVersion,
  }),
  { logout },
)(Settings);
