// @flow
import type {
  State,
  Activity as ActivityType,
  ActivityEdge,
  SwoopActivityInput,
  ActivityLevelOperation,
  AdjustActivityLevelInput,
  ToggleFavoriteInput,
  NavigationOptionsGetter,
} from '../../common/types/index';
import type { NavigationProp } from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  compose,
  path,
  pathOr,
  update,
  assocPath,
  findIndex,
  propEq,
  find,
  pluck,
} from 'ramda';
import { graphql, gql } from 'react-apollo';
import { Screen } from '../components/index';
import displayLoadingState from '../components/displayLoadingState';
import Activity from './Activity';

type Props = {
  activity: ActivityType,
  nextActivity: ?ActivityEdge,
  previousActivity: ?ActivityEdge,
  babyName: string,
  currentBabyId: string,
  navigation: NavigationProp<*>,
  swoopActivity: (
    options: { variables: { input: SwoopActivityInput } },
  ) => Promise<*>, // TODO
  changeActivityLevel: (
    options: { variables: { input: AdjustActivityLevelInput } },
  ) => Promise<*>,
  toggleFavorite: (
    options: { variables: { input: ToggleFavoriteInput } },
  ) => Promise<*>,
  isFavorite: boolean,
};

class ViewThisWeeksActivity extends Component {
  props: Props;

  static navigationOptions: NavigationOptionsGetter = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  getSkillAreaName(activity: ?ActivityEdge) {
    return pathOr('Return to list', ['node', 'skillArea', 'name'], activity);
  }

  refreshActivity = ({ data }) => {
    const newActivity = path(['changeActivity', 'newActivity'], data);

    if (newActivity) {
      this.props.navigation.setParams({
        id: newActivity.id,
        title: newActivity.name,
      });
    }
  };

  handleSwoop = () => {
    const input: SwoopActivityInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
    };

    this.props
      .swoopActivity({ variables: { input } })
      .then(this.refreshActivity);
  };

  handleLevel = (type: ActivityLevelOperation) => {
    const input: AdjustActivityLevelInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
      level: type,
    };

    this.props
      .changeActivityLevel({ variables: { input } })
      .then(this.refreshActivity);
  };

  handleLevelIncrease = () => this.handleLevel('INCREASE');
  handleLevelDecrease = () => this.handleLevel('DECREASE');

  handleToggleFavorite = () => {
    const input: ToggleFavoriteInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
      favorite: !this.props.isFavorite,
    };

    this.props.toggleFavorite({ variables: { input } });
  };

  handleNavigateToActivity = (edge: ?ActivityEdge) => {
    if (edge && edge.node) {
      this.props.navigation.setParams({
        id: edge.node.id,
        title: edge.node.name,
        cursor: edge.cursor,
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  handleNextActivity = () => {
    this.handleNavigateToActivity(this.props.nextActivity);
  };

  handlePreviousActivity = () => {
    this.handleNavigateToActivity(this.props.previousActivity);
  };

  render() {
    const {
      activity,
      nextActivity,
      previousActivity,
      babyName,
      isFavorite,
    } = this.props;

    const previousSkillAreaName = this.getSkillAreaName(previousActivity);
    const nextSkillAreaName = this.getSkillAreaName(nextActivity);

    return (
      <Screen>
        <Activity
          enableNavigation
          enableActions
          activity={activity}
          isFavorite={isFavorite}
          babyName={babyName}
          previousSkillAreaName={previousSkillAreaName}
          nextSkillAreaName={nextSkillAreaName}
          onPreviousActivity={this.handlePreviousActivity}
          onNextActivity={this.handleNextActivity}
          onSwoop={this.handleSwoop}
          onToggleFavorite={this.handleToggleFavorite}
          onLevelIncrease={this.handleLevelIncrease}
          onLevelDecrease={this.handleLevelDecrease}
        />
      </Screen>
    );
  }
}

const updateQueries = {
  ThisWeeksActivitiesList: (previousData, { mutationResult }) => {
    const viewerBabyEdges = ['viewer', 'baby', 'activities', 'edges'];
    const edges = path(viewerBabyEdges, previousData);
    const newActivity = path(
      ['data', 'changeActivity', 'newActivity'],
      mutationResult,
    );
    const oldActivityId = path(
      ['data', 'changeActivity', 'oldActivityId'],
      mutationResult,
    );
    const oldActivityIndex = findIndex(
      edge => edge.node.id === oldActivityId,
      edges,
    );

    if (newActivity && oldActivityId && oldActivityIndex >= 0) {
      const newEdges = update(oldActivityIndex, { node: newActivity }, edges);

      return assocPath(viewerBabyEdges, newEdges, previousData);
    }

    return previousData;
  },
};

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
  graphql(
    gql`
      query ViewThisWeekActivity($babyId: ID!, $activityId: ID!, $cursor: String!) {
        viewer {
          baby(id: $babyId) {
            id
            name
            activity(id: $activityId) {
              ...Activity
            }

            nextActivity: activities(first: 1, after: $cursor) {
              ...ActivityNavigation
            }

            previousActivity: activities(first: 1, before: $cursor) {
              ...ActivityNavigation
            }

            favoriteActivities {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
      ${Activity.fragments.activity}
      ${Activity.fragments.activityNavigation}
    `,
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: {
          babyId: ownProps.currentBabyId,
          activityId: ownProps.navigation.state.params.id,
          cursor: ownProps.navigation.state.params.cursor,
        },
      }),
      props: ({ data }) => {
        const favoriteActivities = path(
          ['viewer', 'baby', 'favoriteActivities'],
          data,
        );
        let isFavorite = false;

        if (favoriteActivities) {
          // this should be simplified once activities include favorite info
          const favorites = pluck('node', favoriteActivities.edges);
          const activityId = path(['viewer', 'baby', 'activity', 'id'], data);

          isFavorite = !!find(propEq('id', activityId), favorites);
        }

        return {
          data,
          activity: path(['viewer', 'baby', 'activity'], data),
          babyName: path(['viewer', 'baby', 'name'], data),
          isFavorite,
          previousActivity: path(
            ['viewer', 'baby', 'previousActivity', 'edges', '0'],
            data,
          ),
          nextActivity: path(
            ['viewer', 'baby', 'nextActivity', 'edges', '0'],
            data,
          ),
        };
      },
    },
  ),
  graphql(
    gql`
      mutation SwoopActivity($input: SwoopActivityInput!) {
        swoopActivity(input: $input) {
          newActivity {
            ...Activity
          }
          oldActivityId
        }
      }
      ${Activity.fragments.activity}
    `,
    { name: 'swoopActivity', options: () => ({ updateQueries }) },
  ),
  graphql(
    gql`
      mutation ChangeActivityLevel($input: AdjustActivityLevelInput!) {
        changeActivity(input: $input) {
          newActivity {
            ...Activity
          }
          oldActivityId
        }
      }
      ${Activity.fragments.activity}
    `,
    { name: 'changeActivityLevel', options: () => ({ updateQueries }) },
  ),
  graphql(
    gql`
      mutation ToggleFavorite($input: ToggleFavoriteInput!) {
        toggleActivityFavorite(input: $input) {
          wasFavorited
        }
      }
    `,
    {
      name: 'toggleFavorite',
      options: { refetchQueries: ['ViewThisWeekActivity', 'getBaby'] },
    },
  ),
  displayLoadingState,
)(ViewThisWeeksActivity);
