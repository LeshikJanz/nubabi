import React, { Component } from 'react';
import {
  View,
  NavigationExperimental,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Tabs from './components/tabs';
import { POP_ROUTE, PUSH_ROUTE } from './constants/actionTypes';
import NubabiIcon from './icons/nubabi';
import { HEADER_FONT_COLOR } from './constants/colours';
import ChooseBaby from './components/chooseBaby';
import Settings from './components/settings';
import EditBaby from './components/profile/editBaby';
import ThisWeeksActivities from './components/stimulation/thisWeeksActivities';
import NextWeeksEquipment from './components/stimulation/nextWeeksEquipment';
import BrowseActivities from './components/stimulation/browseActivities';
import ViewThisWeeksActivity from './components/stimulation/viewThisWeeksActivity';

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
    this._determineCardStyle = this._determineCardStyle.bind(this);
  }

  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _handleBackAction() {
    this._handleAction({ type: POP_ROUTE });
  }

  _handleToggleChooseBaby() {
    // this.props.dispatch({ type: TOGGLE_CHOOSE_BABY_MODAL });
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'chooseBaby' } });
  }

  _handleOpenSettings() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'settings', title: 'Settings' } });
  }

  _renderHeader(sceneProps) {
    switch (sceneProps.scene.route.key) {
      case 'chooseBaby':
      case 'tabs': return (
        <NavigationHeader
          {...sceneProps}
          style={styles.navHeader}
          renderTitleComponent={() => (
            (sceneProps.scene.route.key === 'tabs') ?
              <NavigationHeader.Title
                textStyle={styles.navHeaderTitle}
              >
                {this.props.baby.name}
              </NavigationHeader.Title>
            :
              <View />
          )}
          renderLeftComponent={() => (
            (sceneProps.scene.route.key === 'tabs') ?
              <View>
                <NubabiIcon
                  name="changeBabyIcon"
                  style={styles.headerIcon}
                  onPress={this._handleToggleChooseBaby}
                />
              </View>
            :
              <View
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
              <View style={{ flexDirection: 'row' }}>
                <NubabiIcon
                  name="alerts"
                  style={styles.headerIcon}
                />
                <NubabiIcon
                  name="settings"
                  style={[styles.headerIcon, { fontSize: 16 }]}
                  onPress={this._handleOpenSettings}
                />
              </View>
            :
              <View />
          )}
        />
      );
      default: return (
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
      case 'chooseBaby': return (
        <ChooseBaby />
      );
      case 'settings': return (
        <Settings />
      );
      case 'editBaby': return (
        <EditBaby />
      );
      case 'thisWeeksActivities': return (
        <ThisWeeksActivities />
      );
      case 'nextWeeksEquipment': return (
        <NextWeeksEquipment />
      );
      case 'browseActivities': return (
        <BrowseActivities />
      );
      case 'viewThisWeeksActivity': return (
        <ViewThisWeeksActivity />
      );
      default: return (
        <View style={{ flex: 1 }}>
          <Tabs index={sceneProps.scene.route.index} />
        </View>
      );
    }
  }

  _determineCardStyle(sceneProps) {
    const key = sceneProps.routes[sceneProps.index].key;
    return key === 'chooseBaby' ? styles.cardStyle : '';
  }

  render() {
    const cardStyle = this._determineCardStyle(this.props.navigation);
    return (
      <NavigationCardStack
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        navigationState={this.props.navigation}
        onNavigate={this.props.onNavigate}
        cardStyle={cardStyle}
      />
    );
  }
}

NuBabiMobile.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  baby: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    baby: state.babyReducer,
    navigation: state.navigationReducer,
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
    backgroundColor: 'rgba(116,130,148,0.7)',
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
    height: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(NuBabiMobile);
