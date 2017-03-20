import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import ThisWeeksActivitiesButton from './thisWeeksActivitiesButton';
import NextWeeksEquipmentButton from './nextWeeksEquipmentButton';
import BrowseAllActivitiesButton from './browseAllActivitiesButton';
import CalendarButton from './calendarButton';
import FavouritesButton from './favouritesButton';
import DidYouKnow from './didYouKnow';
import { PUSH_ROUTE } from '../../actions/actionTypes';
import { PANEL_BACKGROUND } from '../../constants/colours';

class Stimulation extends Component {
  constructor(props) {
    super(props);
    this._handleThisWeeksActivities = this._handleThisWeeksActivities.bind(this);
    this._handleNextWeeksEquipment = this._handleNextWeeksEquipment.bind(this);
    this._handleBrowseActivities = this._handleBrowseActivities.bind(this);
  }

  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _handleThisWeeksActivities() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'thisWeeksActivities', title: 'This Weeks Activities' } });
  }

  _handleNextWeeksEquipment() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'nextWeeksEquipment', title: 'Next Weeks Equipment' } });
  }

  _handleBrowseActivities() {
    return this._handleAction({
      type: PUSH_ROUTE, route: { key: 'browseActivities', title: 'Browse All Activities' } });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actionButtons}>
          <CalendarButton />
          <FavouritesButton />
        </View>
        <ScrollView
          style={styles.scrollContainer}
        >
          <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            onPress={this._handleThisWeeksActivities}
            style={styles.oneButton}
          >
            <ThisWeeksActivitiesButton />
          </TouchableHighlight>
          <View style={styles.twoButtons}>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={this._handleNextWeeksEquipment}
            >
              <NextWeeksEquipmentButton />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={this._handleBrowseActivities}
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

Stimulation.propTypes = {
  onNavigate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    navigation: state.navigationReducer,
  };
};

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
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(Stimulation);
