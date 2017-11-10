// @flow
import type {
  Activity as ActivityType,
  ActivityEdge,
  ActivityLevelOperation,
  AdjustActivityLevelInput,
  NavigationOptionsGetter,
  SwoopActivityInput,
  ToggleFavoriteInput,
} from '../../common/types/index';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import {
  assocPath,
  compose,
  find,
  findIndex,
  path,
  pathOr,
  pluck,
  propEq,
  update,
} from 'ramda';
import { gql, graphql } from 'react-apollo';
import { displayLoadingState, Screen, withCurrentBaby } from '../components';
import toggleFavorite from './toggleFavorite';
import Activity from './Activity';
import Favorites from './Favorites';

type Props = {
  activity: ActivityType,
  nextActivity: ?ActivityEdge,
  previousActivity: ?ActivityEdge,
  babyName: string,
  currentBabyId: string,
  navigation: NavigationProp<*>,
  swoopActivity: (options: {
    variables: { input: SwoopActivityInput },
  }) => Promise<*>, // TODO
  changeActivityLevel: (options: {
    variables: { input: AdjustActivityLevelInput },
  }) => Promise<*>,
  completeActivity: (options: {
    variables: { input: CompleteActivityInput },
  }) => Promise<*>, // TODO
  toggleFavorite: (options: {
    variables: { input: ToggleFavoriteInput },
  }) => Promise<*>,
  isFavorite: boolean,
};

class ViewThisWeeksActivity extends PureComponent {
  props: Props;
  state = {
    isLoading: false,
  };

  static navigationOptions: NavigationOptionsGetter = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  getSkillAreaName(activity: ?ActivityEdge) {
    return pathOr('Return to list', ['node', 'skillArea', 'name'], activity);
  }

  refreshActivity = ({ data }) => {
    const newActivity = pathOr(
      path(['swoopActivity', 'newActivity'], data),
      ['changeActivity', 'newActivity'],
      data,
    );

    if (newActivity) {
      this.props.navigation.setParams({
        id: newActivity.id,
        title: newActivity.name,
      });
    }

    this.setState({ isLoading: false });
  };

  handleSwoop = () => {
    const input: SwoopActivityInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
    };

    this.setState({ isLoading: true }, () => {
      this.props
        .swoopActivity({ variables: { input } })
        .then(this.refreshActivity);
    });
  };

  handleLevel = (type: ActivityLevelOperation) => {
    const input: AdjustActivityLevelInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
      level: type,
    };

    this.setState({ isLoading: true }, () => {
      this.props
        .changeActivityLevel({ variables: { input } })
        .then(this.refreshActivity);
    });
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

  handleActivityMediaPress = () => {
    this.props.navigation.navigate('viewActivityMedia', {
      media: this.props.activity.media,
    });
  };

  render() {
    const { isLoading } = this.state;
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
          isLoading={isLoading}
          babyName={babyName}
          previousSkillAreaName={previousSkillAreaName}
          nextSkillAreaName={nextSkillAreaName}
          onPreviousActivity={this.handlePreviousActivity}
          onNextActivity={this.handleNextActivity}
          onSwoop={this.handleSwoop}
          onComplete={this.props.completeActivity}
          onToggleFavorite={this.handleToggleFavorite}
          onLevelIncrease={this.handleLevelIncrease}
          onLevelDecrease={this.handleLevelDecrease}
          onActivityMediaPress={this.handleActivityMediaPress}
        />
      </Screen>
    );
  }
}

// TODO: I don't like to refetch queries, but since the logic
// to figure out whether the changed activity is part of
// Profile's Week ahead might be to complicated, we're resorting
// to this for now, until we split the query or return all data
// we need to selectively update it.
const refetchQueries = ['ThisWeeksActivitiesList', 'Profile'];

export default compose(
  withCurrentBaby,
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

            ...FavoriteActivities
          }
        }
      }
      ${Activity.fragments.activity}
      ${Activity.fragments.activityNavigation}
      ${Favorites.fragments.favorites}
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
    { name: 'swoopActivity', options: () => ({ refetchQueries }) },
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
    { name: 'changeActivityLevel', options: () => ({ refetchQueries }) },
  ),
  graphql(
    gql`
      mutation CompleteActivity($input: CompleteActivityInput!) {
        completeActivity(input: $input) {
          edge {
            node {
              id
            }
          }
        }
      }
    `,
    {
      options: { refetchQueries: ['ThisWeeksActivitiesList'] },
      props: ({
        mutate,
        ownProps: { currentBabyId: babyId, activity: { id } },
      }) => ({
        completeActivity: () =>
          mutate({
            variables: {
              input: {
                id,
                babyId,
              },
            },
          }),
      }),
    },
  ),

  toggleFavorite,
  displayLoadingState,
)(ViewThisWeeksActivity);
