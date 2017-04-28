// @flow
import type { NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { Component } from 'react';
import { View, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import ThisWeeksActivitiesButton from './ThisWeeksActivitiesButton';
import NextWeeksEquipmentButton from './NextWeeksEquipmentButton';
import BrowseAllActivitiesButton from './BrowseAllActivitiesButton';
import CalendarButton from './CalendarButton';
import FavoritesButton from './FavoritesButton';
import DidYouKnow from './DidYouKnow';

type Props = {
  navigation: NavigationProp<*, *>,
};

class Stimulation extends Component {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Stimulation',
  };

  constructor(props: Props) {
    super(props);
    this.handleThisWeeksActivities = this.handleThisWeeksActivities.bind(this);
    this.handleNextWeeksEquipment = this.handleNextWeeksEquipment.bind(this);
    this.handleBrowseActivities = this.handleBrowseActivities.bind(this);
  }

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
      <View style={styles.container}>
        <View style={styles.actionButtons}>
          <CalendarButton />
          <FavoritesButton onPress={this.handleFavorites} />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            onPress={this.handleThisWeeksActivities}
            style={styles.oneButton}
          >
            <ThisWeeksActivitiesButton />
          </TouchableHighlight>
          <View style={styles.twoButtons}>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={this.handleNextWeeksEquipment}
            >
              <NextWeeksEquipmentButton />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={this.handleBrowseActivities}
            >
              <BrowseAllActivitiesButton />
            </TouchableHighlight>
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
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
  },
  actionButtons: {
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
