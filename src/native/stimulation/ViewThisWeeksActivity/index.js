import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  NEXT_SKILL_AREA,
  PREVIOUS_SKILL_AREA,
} from '../../../common/actionTypes';
import { PANEL_BACKGROUND } from '../../../common/themes/defaultTheme';
import ExpertInfo from './ExpertInfo';
import Header from './Header';

class ViewThisWeeksActivity extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.title,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.skillArea !== this.props.skillArea) {
      this.props.navigation.setParams({
        title: this.findActivity(nextProps).name,
      });
    }
  }

  handleNextSkill() {
    return this.props.dispatch({
      type: NEXT_SKILL_AREA,
    });
  }

  handlePreviousSkill() {
    return this.props.dispatch({
      type: PREVIOUS_SKILL_AREA,
    });
  }

  findActivity(props = this.props) {
    const { skillArea: skillAreaId } = props;
    return _.find(props.activities, { skillAreaId });
  }

  render() {
    const skill = this.props.skillAreas[this.props.skillArea];
    const activity = this.findActivity();
    const expert = _.find(this.props.experts, { id: activity.expertId });
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
        >
          <Header skill={skill} activity={activity} />
          <ExpertInfo expert={expert} activity={activity} />
          <View style={styles.nextButtonsContainer}>
            <TouchableHighlight
              onPress={() => this.handlePreviousSkill()}
              underlayColor="rgba(0,0,0,0)"
              style={styles.previousButton}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.handleNextSkill()}
              underlayColor="rgba(0,0,0,0)"
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ViewThisWeeksActivity.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  skillArea: React.PropTypes.number.isRequired,
  skillAreas: React.PropTypes.array.isRequired,
  activities: React.PropTypes.array.isRequired,
  experts: React.PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    skillArea: state.thisWeek.skillArea,
    skillAreas: state.thisWeek.skillAreas,
    activities: state.thisWeek.activities,
    experts: state.thisWeek.experts,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
  },
  scrollContainer: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
    borderLeftWidth: 1,
    borderColor: '#E9ECF4',
    padding: 10,
  },
  previousButton: {
    flex: 2,
    padding: 10,
  },
  nextButtonText: {
    color: '#9EABBC',
    fontSize: 14,
  },
  previousButtonText: {
    color: '#9EABBC',
    fontSize: 14,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ViewThisWeeksActivity);
