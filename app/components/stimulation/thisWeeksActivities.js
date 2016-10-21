import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { SET_SKILL_AREA, PUSH_ROUTE } from '../../actions/actionTypes';

class ThisWeeksActivities extends Component {
  _handleAction(action) {
    this.props.onNavigate(action);
  }

  _handleThisWeeksActivity(skillAreaId) {
    this.props.dispatch({
      type: SET_SKILL_AREA,
      skillArea: skillAreaId,
    });
    return this._handleAction({
      type: PUSH_ROUTE,
      route: {
        key: 'viewThisWeeksActivity',
        title: 'Activities',
      },
    });
  }

  render() {
    const skills = this.props.skillAreas.map((skillArea) => {
      return (
        <TouchableHighlight
          onPress={() => this._handleThisWeeksActivity(skillArea.id)}
          key={skillArea.id}
        >
          <Text>{skillArea.name}</Text>
        </TouchableHighlight>
      );
    });
    return (
      <View style={styles.container}>
        {skills}
      </View>
    );
  }
}

ThisWeeksActivities.propTypes = {
  onNavigate: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  skillAreas: React.PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    skillAreas: state.thisWeeksReducer.skillAreas,
    navigation: state.navigationReducer,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThisWeeksActivities);
