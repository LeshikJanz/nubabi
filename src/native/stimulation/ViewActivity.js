// @flow
import type {
  State,
  ToggleFavoriteInput,
  Activity as ActivityType,
  NavigationOptionsGetter,
} from '../../common/types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose, path, pluck, find, propEq } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { Screen } from '../components';
import Activity from './Activity';
import displayLoadingState from '../components/displayLoadingState';

type Props = {
  activity: ActivityType,
  babyName: string,
  currentBabyId: string,
  isFavorite: boolean,
  toggleFavorite: () => void,
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
      favorite: !this.props.isFavorite,
    };

    this.props.toggleFavorite({ variables: { input } });
  };

  handleActivityMediaPress = () => {
    this.props.navigation.navigate('viewActivityMedia', {
      media: this.props.activity.media,
    });
  };

  render() {
    const { activity, babyName, isFavorite } = this.props;

    return (
      <Screen>
        <Activity
          activity={activity}
          babyName={babyName}
          isFavorite={isFavorite}
          onToggleFavorite={this.handleToggleFavorite}
          onActivityMediaPress={this.handleActivityMediaPress}
        />
      </Screen>
    );
  }
}

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
  graphql(
    gql`
      query ViewActivity($babyId: ID!, $activityId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            name
            
            activity(id: $activityId) {
              ...Activity
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
        const favoriteActivities = path(
          ['viewer', 'baby', 'favoriteActivities'],
          data,
        );
        let isFavorite = false;

        if (favoriteActivities) {
          // TODO: this could be simplified if activities include favorite info
          const favorites = pluck('node', favoriteActivities.edges);
          const activityId = path(['viewer', 'baby', 'activity', 'id'], data);

          isFavorite = !!find(propEq('id', activityId), favorites);
        }

        return {
          data,
          activity: path(['viewer', 'baby', 'activity'], data),
          babyName: path(['viewer', 'baby', 'name'], data),
          isFavorite,
        };
      },
    },
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
      options: { refetchQueries: ['ViewActivity', 'getBaby'] },
    },
  ),
  displayLoadingState,
)(ViewActivity);
