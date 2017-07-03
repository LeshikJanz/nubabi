// @flow
import type { State, Viewer } from '../../common/types';
import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Box, List, ListItem, ListItemSeparator, Text } from '../components';
import { logout } from '../../common/auth/actions';
import theme, { NUBABI_RED } from '../../common/themes/defaultTheme';
import UserProfileTrigger from './UserProfileTrigger';

type Props = {
  user: Viewer,
  logout: typeof logout,
  appName: string,
  appVersion: string,
  onNavigateToNotificationSettings: () => void,
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
        <Text style={() => styles.copyrightText}>
          {copyrightText}
        </Text>
      </View>
    );
  }

  render() {
    const { user: viewer } = this.props;

    if (!viewer) {
      return null;
    }

    const userProp = filter(UserProfileTrigger.fragments.profile, viewer.user);

    return (
      <Box flex={1}>
        <List>
          <ListItemSeparator />
          <UserProfileTrigger user={userProp} />
          <ListItemSeparator />
          <ListItem
            leftIcon="ios-notifications"
            rightArrow
            onPress={this.props.onNavigateToNotificationSettings}
          >
            <Text color="secondary">Notifications</Text>
          </ListItem>
          <ListItem leftIcon="ios-people" rightArrow last>
            <Text color="secondary">Family and Friends</Text>
          </ListItem>
          <ListItemSeparator />
          <Box contentSpacing>
            <Text color="secondary">UNIT PREFERENCES</Text>
          </Box>
          <ListItem rightArrow rightText="Kilograms" onPress={() => {}}>
            <Text color="secondary">Weight</Text>
          </ListItem>
          <ListItem rightArrow rightText="Centimeters" last>
            <Text color="secondary">Height</Text>
          </ListItem>
        </List>
        <View style={styles.submitButtonContainer}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            onPress={this.props.logout}
          >
            <View style={styles.submitButton}>
              <Text style={() => styles.submitText}>LOG OUT</Text>
            </View>
          </TouchableHighlight>
        </View>
        {this.renderCopyright()}
      </Box>
    );
  }
}

const styles = {
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
};

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
          user {
            ...UserProfile
          }
        }
      }
      ${UserProfileTrigger.fragments.profile}
    `,
    {
      options: { fetchPolicy: 'cache-and-network' },
      props: ({ data }) => ({
        user: path(['viewer'], data),
      }),
    },
  ),
)(Settings);
