// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import ThisWeeksActivitiesButton from './ThisWeeksActivitiesButton';
import NextWeeksEquipmentButton from './NextWeeksEquipmentButton';
import BrowseAllActivitiesButton from './BrowseAllActivitiesButton';
import CalendarButton from './CalendarButton';
import FavoritesButton from './FavoritesButton';
import DidYouKnow from './DidYouKnow';
import {
  getChildContext,
  getLayoutInitialState,
  childContextTypes,
  handleLayout,
} from '../components/withLayout';

type Props = {
  navigation: NavigationProp<*, *>,
};

class Stimulation extends Component {
  props: Props;
  state = {
    ...getLayoutInitialState(),
  };

  static navigationOptions: NavigationOptions = {
    title: 'Stimulation',
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

  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <View style={styles.actionButtons}>
          <CalendarButton />
          <FavoritesButton onPress={this.handleFavorites} />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <ThisWeeksActivitiesButton
            style={styles.oneButton}
            onPress={this.handleThisWeeksActivities}
          />

          <View style={styles.twoButtons}>
            <NextWeeksEquipmentButton onPress={this.handleNextWeeksEquipment} />
            <BrowseAllActivitiesButton onPress={this.handleBrowseActivities} />
          </View>

          <View style={styles.didYouKnow}>
            <DidYouKnow />
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
  },
  actionButtons: {
    justifyContent: 'center',
    height: 68,
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  oneButton: {
    flex: 1,
    height: 210,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  twoButtons: {
    height: 130,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginTop: 5,
    marginBottom: 10,
    flex: 1,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  didYouKnow: {
    marginTop: 5,
    height: 96,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

export default Stimulation;
