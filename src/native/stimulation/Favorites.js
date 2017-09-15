// @flow
import type {
  ActivityEdge,
  GraphQLDataProp,
  NavigationOptions,
} from '../../common/types';
import type { Event } from 'react-native';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { gql, graphql } from 'react-apollo';
import { compose, path } from 'ramda';
import { displayLoadingState, Screen, withCurrentBaby } from '../components';
import ActivityList from './ActivityList';

type Props = {
  activities: Array<ActivityEdge>,
  navigation: NavigationProp<*>,
  data: GraphQLDataProp<*>,
};

class FavoriteActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Favorites',
  };

  handleNavigate = (id: string, title: string) => {
    this.props.navigation.navigate('viewActivity', {
      id,
      title,
    });
  };

  render() {
    return (
      <Screen>
        <ActivityList
          activities={this.props.activities}
          emptyMessage="No activities have been favorited yet."
          onActivityItemPress={this.handleNavigate}
          onRefresh={this.props.data.refetch}
        />
      </Screen>
    );
  }
}

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      query FavoriteActivitiesList($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            favoriteActivities {
              edges {
                node {
                  ...ActivityList
                }
              }
            }
          }
        }
      }
      ${ActivityList.fragments.activities}
    `,
    {
      options: ({ currentBabyId }) => ({
        fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
        variables: { babyId: currentBabyId },
      }),
      props: ({ data }) => {
        const activities = path(['viewer', 'baby', 'favoriteActivities'], data);

        return {
          data,
          activities: activities ? activities.edges : [],
        };
      },
    },
  ),
  displayLoadingState,
)(FavoriteActivities);
