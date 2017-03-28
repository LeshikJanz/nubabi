// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import _ from 'lodash';
import type { NavigationProp } from 'react-navigation';
import type { Activity, SkillArea } from '../../common/types';
import { SET_SKILL_AREA } from '../../common/actionTypes';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
const width = Dimensions.get('window').width;

type Props = {
  dispatch: Dispatch<*, *>,
  skillAreas: Array<SkillArea>,
  activities: Array<Activity>,
  navigation: NavigationProp<*, *>,
};

class ThisWeeksActivities extends Component {
  props: Props;

  static navigationOptions = {
    title: "This Week's Activities",
    header: (_, defaultHeader) => ({
      ...defaultHeader,
      backTitle: 'Activities',
    }),
  };

  handleThisWeeksActivity = (skillAreaId: number, title: string) => {
    this.props.dispatch({
      type: SET_SKILL_AREA,
      skillArea: skillAreaId,
    });

    this.props.navigation.navigate('viewThisWeeksActivity', { title });
  };

  render() {
    const skills = this.props.skillAreas.map((skillArea) => {
      const activity = _.find(this.props.activities, { skillAreaId: skillArea.id });
      return (
        <TouchableHighlight
          underlayColor="rgba(0,0,0,0)"
          onPress={() => this.handleThisWeeksActivity(skillArea.id, activity.name)}
          key={skillArea.id}
        >
          <View style={styles.activityRow}>
            <Image style={styles.skillImage} source={skillArea.image_thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.skillName}>{skillArea.name}</Text>
              <Text style={styles.activityName}>{activity.name}</Text>
            </View>
            <Image style={styles.skillIcon} source={skillArea.icon} />
          </View>
        </TouchableHighlight>
      );
    });
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
        >
          {skills}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    skillAreas: state.thisWeek.skillAreas,
    activities: state.thisWeek.activities,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PANEL_BACKGROUND,
    flexDirection: 'column',
  },
  scrollContainer: {
    flex: 1,
  },
  activityRow: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    width: width - 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  skillImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    padding: 10,
  },
  skillName: {
    color: '#454D56',
    fontSize: 16,
    marginBottom: 5,
  },
  activityName: {
    color: '#748294',
    fontSize: 14,
  },
  skillIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThisWeeksActivities);
