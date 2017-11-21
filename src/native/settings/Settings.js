// @flow
import type { SettingsState, State, Viewer } from '../../common/types';
import React, { Component } from 'react';
import {
  ActionSheetIOS,
  ScrollView,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { compose, invertObj, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Box, List, ListItem, ListItemSeparator, Text } from '../components';
import {
  resetSettings,
  resetTips,
  setSettingsValue,
} from '../../common/settings/reducer';
import { logout } from '../../common/auth/actions';
import theme, { NUBABI_RED } from '../../common/themes/defaultTheme';
import UserProfileTrigger from './UserProfileTrigger';

type Props = {
  user?: { user: Viewer },
  settings: SettingsState,
  appName: string,
  appVersion: string,
  logout: typeof logout,
  setSettingsValue: typeof setSettingsValue,
  resetTips: typeof resetTips,
  resetSettings: typeof resetSettings,
  onNavigateToNotificationSettings: () => void,
  onNavigateToEditProfile: () => void,
  onNavigateToFriends: () => void,
};

const copyrightHolder = 'MyLearningBaby Ltd';
const copyrightYear = new Date().getFullYear();

const unitDisplayMapping = {
  kg: 'Kilograms',
  cm: 'Centimeters',
  in: 'Inches',
  lbs: 'Pounds',
};

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

  getUnitLabel(type: 'weight' | 'height') {
    return unitDisplayMapping[this.props.settings.unitDisplay[type]];
  }

  handleActionSheet = (options: Array<string>, type: string) => {
    // TODO: this is iOS only
    const sheetOptions = [...options, 'Cancel'];
    const cancelIndex = sheetOptions.length - 1;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: sheetOptions,
        cancelButtonIndex: cancelIndex,
        title: 'Choose a Unit',
        message: 'Set this unit to be displayed in measurements across the app',
      },
      selectedIndex => {
        if (selectedIndex === cancelIndex) {
          return;
        }

        const selectedUnit = invertObj(unitDisplayMapping)[
          sheetOptions[selectedIndex]
        ];

        if (selectedUnit) {
          this.props.setSettingsValue(['unitDisplay', type], selectedUnit);
        }
      },
    );
  };

  handleChooseWeightUnit = () => {
    this.handleActionSheet(['Kilograms', 'Pounds'], 'weight');
  };

  handleChooseHeightUnit = () => {
    this.handleActionSheet(['Centimeters', 'Inches'], 'height');
  };

  renderCopyright() {
    const copyright = `© ${copyrightYear} ${copyrightHolder}.`;
    let copyrightText = `${copyright}`;
    const version = this.getAppVersionString();
    if (version) {
      copyrightText = `${copyrightText} ${version}`;
    }
    return (
      <View style={styles.copyrightContainer}>
        <Text style={() => styles.copyrightText}>{copyrightText}</Text>
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
      <Box flex={1} as={ScrollView}>
        <List>
          <ListItemSeparator />
          <UserProfileTrigger
            user={userProp}
            onPress={this.props.onNavigateToEditProfile}
          />
          <ListItemSeparator />
          <ListItem
            leftIcon="ios-notifications"
            rightArrow
            onPress={this.props.onNavigateToNotificationSettings}
          >
            <Text color="secondary">Notifications</Text>
          </ListItem>
          <ListItem
            leftIcon="ios-people"
            rightArrow
            last
            onPress={this.props.onNavigateToFriends}
          >
            <Text color="secondary">Family and Friends</Text>
          </ListItem>
          <Box contentSpacing>
            <Text color="secondary">UNIT PREFERENCES</Text>
          </Box>
          <ListItem
            rightArrow
            rightText={this.getUnitLabel('weight')}
            onPress={this.handleChooseWeightUnit}
          >
            <Text color="secondary">Weight</Text>
          </ListItem>
          <ListItem
            rightArrow
            rightText={this.getUnitLabel('height')}
            onPress={this.handleChooseHeightUnit}
            last
          >
            <Text color="secondary">Height</Text>
          </ListItem>
          <Box contentSpacing />
          <ListItem onPress={this.props.resetSettings} last>
            <Text color="primary">Reset all settings</Text>
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
    fontWeight: theme.text.bold.toString(),
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
      settings: state.settings,
    }),
    { setSettingsValue, resetSettings, resetTips, logout },
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
