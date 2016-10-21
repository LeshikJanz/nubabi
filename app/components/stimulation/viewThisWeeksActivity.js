import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { NEXT_SKILL_AREA, PREVIOUS_SKILL_AREA } from '../../actions/actionTypes';

class ViewThisWeeksActivity extends Component {
  _handleNextSkill() {
    return this.props.dispatch({
      type: NEXT_SKILL_AREA,
    });
  }

  _handlePreviousSkill() {
    return this.props.dispatch({
      type: PREVIOUS_SKILL_AREA,
    });
  }

  render() {
    const skill = this.props.skillAreas[this.props.skillArea];
    const activity = this.props.activities.filter(sel => sel.skillAreaId === this.props.skillArea);
    return (
      <View style={styles.container}>
        <Text>{skill.name}</Text>
        <Text>{activity[0].description}</Text>
        <TouchableHighlight onPress={() => this._handleNextSkill()}>
          <Text>Next</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._handlePreviousSkill()}>
          <Text>Previous</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ViewThisWeeksActivity.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  skillArea: React.PropTypes.number.isRequired,
  skillAreas: React.PropTypes.array.isRequired,
  activities: React.PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onNavigate: action => dispatch(action),
  };
};

const mapStateToProps = (state) => {
  return {
    skillArea: state.thisWeeksReducer.skillArea,
    skillAreas: state.thisWeeksReducer.skillAreas,
    activities: state.thisWeeksReducer.activities,
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewThisWeeksActivity);
