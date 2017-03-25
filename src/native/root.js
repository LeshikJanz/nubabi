import React, { Component } from 'react';
import {
  View,
  NavigationExperimental,
  Text,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import RightHeader from './navigation/RightHeader';
import LeftHeader from './navigation/LeftHeader';
import Tabs from './tabs';
import { POP_ROUTE, PUSH_ROUTE } from '../common/actionTypes';
import { HEADER_FONT_COLOR } from '../common/themes/defaultTheme';
import Login from './login';
import ChooseBaby from './profile/ChooseBaby';
import Settings from './settings';
import EditBaby from './profile/EditBaby';
import ThisWeeksActivities from './stimulation/ThisWeeksActivities';
import NextWeeksEquipment from './stimulation/NextWeeksEquipment';
import BrowseActivities from './stimulation/BrowseActivities';
import ViewThisWeeksActivity from './stimulation/ViewThisWeeksActivity';

const {
  Header: NavigationHeader,
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class NuBabiMobile extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._handleToggleChooseBaby = this._handleToggleChooseBaby.bind(this);
    this._handleAction = this._handleAction.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    this._handleOpenSettings = this._handleOpenSettings.bind(this);
  }

  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _handleBackAction() {
    this._handleAction({ type: POP_ROUTE });
  }

  _handleToggleChooseBaby() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'chooseBaby' },
    });
  }

  _handleOpenSettings() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'settings', title: 'Settings' },
    });
  }

  _renderHeader(sceneProps) {
    const baby = this.props.babies.items[this.props.babies.index];
    switch (sceneProps.scene.route.key) {
      case 'chooseBaby':
      case 'tabs':
        return (
          <NavigationHeader
            {...sceneProps}
            style={styles.navHeader}
            renderTitleComponent={() => (
              (sceneProps.scene.route.key === 'tabs') ? <NavigationHeader.Title
                textStyle={styles.navHeaderTitle}
              >
                {baby ? baby.name : 'Nubabi'}
              </NavigationHeader.Title>
                : <View />
            )}
            renderLeftComponent={() => (
              (sceneProps.scene.route.key === 'tabs') ?
                <LeftHeader onPress={this._handleToggleChooseBaby} />
                : <View
                style={styles.headerBackView}
              >
                <Icon
                  name="ios-close-outline"
                  style={styles.headerBackIcon}
                  onPress={this._handleBackAction}
                />
              </View>
            )}
            renderRightComponent={() => (
              (sceneProps.scene.route.key === 'tabs') ?
                <RightHeader onPress={this._handleOpenSettings} />
                : <View />
            )}
          />
        );
      default:
        return (
          <NavigationHeader
            {...sceneProps}
            style={styles.navHeader}
            renderTitleComponent={() => (
              <NavigationHeader.Title>{sceneProps.scene.route.title}</NavigationHeader.Title>)}
            renderLeftComponent={() => (
              <View
                style={styles.headerBackView}
              >
                <Icon
                  name="ios-arrow-back-outline"
                  style={styles.headerBackIcon}
                  onPress={this._handleBackAction}
                />
                <Text
                  style={styles.headerBackText}
                  onPress={this._handleBackAction}
                >
                  Back
                </Text>
              </View>
            )}
          />
        );
    }
  }

  _renderScene(sceneProps) {
    switch (sceneProps.scene.route.key) {
      case 'chooseBaby':
        return (
          <ChooseBaby
            {...sceneProps}
          />
        );
      case 'settings':
        return (
          <Settings />
        );
      case 'editBaby':
        return (
          <EditBaby />
        );
      case 'thisWeeksActivities':
        return (
          <ThisWeeksActivities />
        );
      case 'nextWeeksEquipment':
        return (
          <NextWeeksEquipment />
        );
      case 'browseActivities':
        return (
          <BrowseActivities />
        );
      case 'viewThisWeeksActivity':
        return (
          <ViewThisWeeksActivity />
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Tabs index={sceneProps.scene.route.index} />
          </View>
        );
    }
  }

  render() {
    if (!this.props.appStarted) {
      // TODO: splash screen

      return null;
    }
    if (this.props.appStarted && !this.props.appOnline) {
      return null;
    }

    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Login />;
    }

    // FIXME: what to do when there are no babies

    return (
      <NavigationCardStack
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        navigationState={this.props.navigation}
        onNavigate={this.props.onNavigate}
        cardStyle={styles.cardStyle}
      />
    );
  }
}

NuBabiMobile.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  babies: React.PropTypes.object.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  appStarted: React.PropTypes.bool.isRequired,
  appOnline: React.PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    //onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation,
    babies: state.babies,
    isAuthenticated: state.auth.isAuthenticated,
    appStarted: state.app.started,
    appOnline: state.app.online,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  cardStyle: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  headerIcon: {
    padding: 10,
    backgroundColor: 'transparent',
    color: HEADER_FONT_COLOR,
    fontSize: 17,
  },
  navHeader: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    height: 60,
  },
  navHeaderTitle: {
    fontSize: 17,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#ccc',
    flex: 1,
  },
  headerBackView: {
    flexDirection: 'row',
    flex: 1,
  },
  headerBackText: {
    lineHeight: 33,
    color: HEADER_FONT_COLOR,
  },
  headerBackIcon: {
    padding: 10,
    backgroundColor: 'transparent',
    color: HEADER_FONT_COLOR,
    fontSize: 25,
    marginTop: -6,
    marginRight: -4,
  },
});

const TabsNavigator = TabNavigator({
  Home: { screen: () => <Text>hi</Text> },
});

const Root = ({ dispatch, navigation }) => {
  const nav = addNavigationHelpers({
    dispatch,
    state: navigation,
  });

  return (
    <AppNavigator navigation={nav} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
