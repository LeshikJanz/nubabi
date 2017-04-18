// @flow
import type { State, Activity } from '../../common/types';
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
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import type { Dispatch } from 'redux';
import type { NavigationProp } from 'react-navigation';
import { PANEL_BACKGROUND } from '../../common/themes/defaultTheme';
import displayLoadingState from '../components/displayLoadingState';
import iconMappings from './iconMappings';

const width = Dimensions.get('window').width;

type Props = {
  dispatch: Dispatch<*>,
  activities: Array<Activity>,
  navigation: NavigationProp<*, *>,
};

class ThisWeeksActivities extends Component {
  props: Props;

  static fragments = {
    activities: gql`
      fragment ThisWeekActivities on Activity {
        id
        name
        skillArea {
          id
          name
          image {
            thumb {
              url
            }
          }
          icon
          completedIcon
        }
      }
    `,
  };

  static navigationOptions = {
    title: "This Week's Activities",
    header: (_, defaultHeader) => ({
      ...defaultHeader,
      backTitle: 'Activities',
    }),
  };

  handleThisWeeksActivity = (
    id: string,
    title: string,
    skillAreaId: string,
  ) => {
    this.props.dispatch({
      type: 'SET_SKILL_AREA',
      skillArea: skillAreaId,
    });

    this.props.navigation.navigate('viewThisWeeksActivity', { id, title });
  };

  render() {
    // TODO: we probably need a ListView component here
    const activities = this.props.activities.map((activity: Activity) => {
      const { skillArea } = activity;

      return (
        <TouchableHighlight
          key={skillArea.id}
          underlayColor="rgba(0,0,0,0)"
          onPress={() => {
            this.handleThisWeeksActivity(
              activity.id,
              activity.name,
              skillArea.id,
            );
          }}
        >
          <View style={styles.activityRow}>
            <Image
              style={styles.skillImage}
              source={{ uri: path(['image', 'thumb', 'url'], skillArea) }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.skillName}>{skillArea.name}</Text>
              <Text style={styles.activityName}>{activity.name}</Text>
            </View>
            <Image
              style={styles.skillIcon}
              source={iconMappings(skillArea.icon)}
            />
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {activities}
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

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
  graphql(
    gql`
      query ThisWeeksActivitiesList($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            activities {
              edges {
                node {
                  ...ThisWeekActivities
                }
              }
            }
          }
        }
      }
      ${ThisWeeksActivities.fragments.activities}
    `,
    {
      options: ({ currentBabyId }) => ({
        variables: { babyId: currentBabyId },
      }),
      props: ({ data }) => {
        const activities = path(
          ['viewer', 'baby', 'activities', 'edges'],
          data,
        );

        return {
          data,
          activities: activities ? activities.map(edge => edge.node) : [],
        };
      },
    },
  ),
  displayLoadingState,
)(ThisWeeksActivities);
