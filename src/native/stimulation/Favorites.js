// @flow
// FIXME: This uses SegmentedControlIOS thus not cross-platform
import type {
  State,
  ActivityEdge,
  NavigationOptions,
} from '../../common/types';
import type { Event } from 'react-native';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { View, Text, SegmentedControlIOS } from 'react-native';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import { compose, path } from 'ramda';
import displayLoadingState from '../components/displayLoadingState';
import { Screen } from '../components';
import ActivityList from './ActivityList';
import theme from '../../common/themes/defaultTheme';
import mapEdgesToProp from '../shared/mapEdgesToProp';

type Props = {
  activities: Array<ActivityEdge>,
  navigation: NavigationProp<*>,
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
        />
      </Screen>
    );
  }
}

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
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
      props: mapEdgesToProp('viewer.baby.favoriteActivities', 'activities'),
    },
  ),
  displayLoadingState,
)(FavoriteActivities);
