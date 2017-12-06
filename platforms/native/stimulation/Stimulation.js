// @flow
import type { NavigationOptions } from 'core/types';
import type { NavigationProp } from 'react-navigation';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { withCurrentBabyRequired } from '../components';
import { PANEL_BACKGROUND } from 'core/themes/defaultTheme';
import ThisWeeksActivitiesButton from './ThisWeeksActivitiesButton';
import NextWeeksEquipmentButton from './NextWeeksEquipmentButton';
import ActivityHistoryButton from './ActivityHistoryButton';
import BrowseActivitiesHeaderButton from './BrowseActivitiesHeaderButton';
import FavoritesButton from './FavoritesButton';
import {
  childContextTypes,
  getChildContext,
  getLayoutInitialState,
  handleLayout,
} from '../components/withLayout';
import hoistStatics from '../components/hoistStatics';

type Props = {
  navigation: NavigationProp<*, *>,
};

class Stimulation extends Component {
  props: Props;
  state = {
    ...getLayoutInitialState(),
  };

  static navigationOptions: NavigationOptions = {
    title: 'Boost',
  };

  static childContextTypes = childContextTypes;

  getChildContext = getChildContext.bind(this);

  handleLayout = handleLayout.bind(this);

  handleThisWeeksActivities = () => {
    this.props.navigation.navigate('thisWeekActivities');
  };

  handleNextWeeksEquipment = () => {
    this.props.navigation.navigate('nextWeeksEquipment');
  };

  handleBrowseActivities = () => {
    this.props.navigation.navigate('browseActivities');
  };

  handleFavorites = () => {
    this.props.navigation.navigate('favoriteActivities');
  };

  handleActivityHistory = () => {
    this.props.navigation.navigate('activityHistory');
  };

  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <View style={styles.actionButtons}>
          <FavoritesButton onPress={this.handleFavorites} />
          <BrowseActivitiesHeaderButton onPress={this.handleBrowseActivities} />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <ThisWeeksActivitiesButton
            style={styles.oneButton}
            onPress={this.handleThisWeeksActivities}
          />

          <View style={styles.twoButtons}>
            <NextWeeksEquipmentButton onPress={this.handleNextWeeksEquipment} />
            <ActivityHistoryButton onPress={this.handleActivityHistory} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PANEL_BACKGROUND,
    paddingBottom: 1,
  },
  actionButtons: {
    justifyContent: 'center',
    height: 68,
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  oneButton: {
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  twoButtons: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 10,
    flex: 1,
  },
});

export default hoistStatics(withCurrentBabyRequired)(Stimulation);
