import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { PUSH_ROUTE } from '../../constants/actionTypes';

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
        <TouchableHighlight>
          <Text onPress={this._handleThisWeeksActivities}>This Week's Activities</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text onPress={this._handleNextWeeksEquipment}>Equipment for Next Week</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text onPress={this._handleBrowseActivities}>Browse All Activities</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Stimulation.propTypes = {
  navigation: React.PropTypes.object.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: (action) => dispatch(action),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Stimulation);
