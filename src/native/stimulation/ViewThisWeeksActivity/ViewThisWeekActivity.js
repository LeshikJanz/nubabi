// @flow
import type { State, Activity } from '../../../common/types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Ionicons';
import type { Dispatch } from 'redux';
import theme, { PANEL_BACKGROUND } from '../../../common/themes/defaultTheme';
import displayLoadingState from '../../components/displayLoadingState';
import ExpertInfo from './ExpertInfo';
import Header from './Header';
import Steps from './Steps';

type Props = {
  activity: Activity,
  dispatch: Dispatch<*>,
};

// FIXME: how to get previous/next working with react-navigation
// since it doesn't seem to have a replace action.

class ViewThisWeeksActivity extends Component {
  props: Props;

  static navigationOptions = {
    title: ({ state }) => state.params.title,
  };

  handleNextSkill() {
    return this.props.dispatch({
      type: 'NEXT_SKILL_AREA',
    });
  }

  handlePreviousSkill() {
    return this.props.dispatch({
      type: 'PREVIOUS_SKILL_AREA',
    });
  }

  render() {
    const { activity } = this.props;
    const skill = activity.skillArea;
    const { expert } = activity;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Header
            skillName={skill.name}
            skillImage={skill.image.large}
            activityName={activity.name}
          />
          <ExpertInfo
            expert={expert}
            activityDescription={activity.introduction}
          />

          <Steps steps={activity.steps} />
        </ScrollView>
        <View style={styles.nextButtonsContainer}>
          <TouchableHighlight
            onPress={() => this.handlePreviousSkill()}
            underlayColor="rgba(0,0,0,0)"
            style={styles.previousButton}
          >
            <View style={styles.buttonContainer}>
              <Icon name="md-arrow-back" style={styles.navigationIcon} />
              <View
                style={[styles.navigationSkillContainer, { marginLeft: 10 }]}
              >
                <Text style={styles.previousButtonText}>Previous</Text>
                <Text>Social & Emotional</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.handleNextSkill()}
            underlayColor="rgba(0,0,0,0)"
            style={styles.nextButton}
          >
            <View style={styles.buttonContainer}>
              <View
                style={[styles.navigationSkillContainer, { marginRight: 10 }]}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <Text style={{ textAlign: 'right' }}>Sensory</Text>
              </View>
              <Icon name="md-arrow-forward" style={styles.navigationIcon} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PANEL_BACKGROUND,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  nextButtonsContainer: {
    flex: 0.1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
  },
  navigationSkillContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  nextButton: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#E9ECF4',
    padding: 10,
  },
  previousButton: {
    flex: 1,
    padding: 10,
  },
  nextButtonText: {
    color: theme.colors.secondary,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
  },
  previousButtonText: {
    color: theme.colors.secondary,
    fontSize: 14,
    marginBottom: 10,
  },
  navigationIcon: {
    fontSize: 25,
    color: theme.colors.secondary,
    alignSelf: 'center',
  },
});

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
  graphql(
    gql`
      query ViewThisWeekActivity($babyId: ID!, $activityId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            activity(id: $activityId) {
              id
              ...HeaderActivity
              ...ExpertInfoActivity
              expert {
                ...ExpertInfo
              }
              skillArea {
                ...HeaderSkill
                id
                name
                image {
                  large {
                    url
                  }
                }
              }
              ...Steps
            }
          }
        }
      }
      ${Header.fragments.skillArea}
      ${Header.fragments.activity}
      ${ExpertInfo.fragments.expert}
      ${ExpertInfo.fragments.activity}
      ${Steps.fragments.steps}
    `,
    {
      options: ownProps => ({
        variables: {
          babyId: ownProps.currentBabyId,
          activityId: ownProps.navigation.state.params.id,
        },
      }),
      props: ({ data }) => ({
        data,
        activity: path(['viewer', 'baby', 'activity'], data),
      }),
    },
  ),
  displayLoadingState,
)(ViewThisWeeksActivity);
