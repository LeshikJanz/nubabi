// @flow
import type {
  Activity as ActivityType,
  NavigationOptionsGetter,
  NavigationProp,
  ToggleFavoriteInput,
} from 'core/types';
import React, { PureComponent } from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { displayLoadingState, Screen, withCurrentBaby } from '../components';
import { toggleFavorite } from './toggleFavorite';
import Activity, { handleActivityShare } from './Activity';

type Props = {
  activity: ActivityType,
  babyName: string,
  currentBabyId: string,
  isFavorite: boolean,
  toggleFavorite: () => void,
  navigation: NavigationProp,
};

export class ViewActivity extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptionsGetter = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  handleToggleFavorite = () => {
    const input: ToggleFavoriteInput = {
      id: this.props.activity.id,
      babyId: this.props.currentBabyId,
      favorite: !this.props.activity.isFavorite,
    };

    this.props.toggleFavorite({ variables: { input } });
  };

  handleActivityMediaPress = () => {
    this.props.navigation.navigate('viewActivityMedia', {
      media: this.props.activity.media,
    });
  };

  handleActivityShare = handleActivityShare.bind(this);

  render() {
    const { activity, babyName } = this.props;

    return (
      <Screen>
        <Activity
          activity={activity}
          babyName={babyName}
          isFavorite={activity.isFavorite}
          onToggleFavorite={this.handleToggleFavorite}
          onShare={this.handleActivityShare}
          onActivityMediaPress={this.handleActivityMediaPress}
        />
      </Screen>
    );
  }
}

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query ViewActivity($babyId: ID!, $activityId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            name

            activity(id: $activityId) {
              ...Activity
              isFavorite
            }
          }
        }
      }
      ${Activity.fragments.activity}
    `,
    // TODO: remove duplication with ViewThisWeeksActivity
    {
      options: ownProps => ({
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: {
          babyId: ownProps.currentBabyId,
          activityId: ownProps.navigation.state.params.id,
        },
      }),
      props: ({ data }) => {
        return {
          data,
          activity: path(['viewer', 'baby', 'activity'], data),
          babyName: path(['viewer', 'baby', 'name'], data),
        };
      },
    },
  ),
  toggleFavorite,
  displayLoadingState,
)(ViewActivity);
