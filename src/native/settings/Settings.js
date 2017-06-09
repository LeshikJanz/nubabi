// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import type { State, Viewer } from '../../common/types';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { logout } from '../../common/auth/actions';
import theme, { NUBABI_RED } from '../../common/themes/defaultTheme';
import UserProfile from './UserProfile';

type Props = {
  user: Viewer,
  logout: typeof logout,
  appName: string,
  appVersion: string,
};

const copyrightHolder = 'MyLearningBaby Ltd';
const copyrightYear = new Date().getFullYear();

export class Settings extends Component {
  props: Props;

  static navigationOptions = {
    title: 'Settings',
  };

  getAppVersionString() {
    const { appName, appVersion } = this.props;

    if (appName && appVersion) {
      return [appName, appVersion].join(' ');
    }

    return null;
  }

  renderCopyright() {
    const copyright = `© ${copyrightYear} ${copyrightHolder}.`;
    let copyrightText = `${copyright}`;
    const version = this.getAppVersionString();
    if (version) {
      copyrightText = `${copyrightText} ${version}`;
    }
    return (
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>{copyrightText}</Text>
      </View>
    );
  }

  render() {
    const { user: viewer } = this.props;

    if (!viewer) {
      return null;
    }

    const userProp = filter(UserProfile.fragments.profile, viewer.user);
    const viewerProp = filter(UserProfile.fragments.viewer, viewer);

    return (
      <View style={styles.container}>
        <UserProfile user={userProp} viewer={viewerProp} />
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

        {this.renderCopyright()}

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
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 20,
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

export default compose(
  connect(
    (state: State) => ({
      appName: state.config.appName,
      appVersion: state.config.appVersion,
    }),
    { logout },
  ),
  graphql(
    gql`
      query UserProfile {
        viewer {
          ...UserProfileViewer
          user {
            ...UserProfile
          }
        }
      }
      ${UserProfile.fragments.viewer}
      ${UserProfile.fragments.profile}
    `,
    {
      options: { fetchPolicy: 'cache-and-network' },
      props: ({ data }) => ({
        user: path(['viewer'], data),
      }),
    },
  ),
)(Settings);
