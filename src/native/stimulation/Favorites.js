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

const ACTIVITIES_INDEX = 0;
const RECIPES_INDEX = 1;

type Props = {
  activities: Array<ActivityEdge>,
  navigation: NavigationProp<*>,
};

class FavoriteActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'Favorites',
  };

  state = {
    selectedIndex: ACTIVITIES_INDEX,
  };

  handleNavigate = (id: string, title: string) => {
    this.props.navigation.navigate('viewActivity', {
      id,
      title,
    });
  };

  handleSectionChange = (event: Event) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  };

  renderContent() {
    if (this.state.selectedIndex === RECIPES_INDEX) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.open.white1,
          }}
        >
          <Text>No recipes yet</Text>
        </View>
      );
    }

    return (
      <ActivityList
        activities={this.props.activities}
        emptyMessage="No activities have been favorited yet."
        onActivityItemPress={this.handleNavigate}
      />
    );
  }

  render() {
    return (
      <Screen>
        <View
          style={{ padding: 10, backgroundColor: theme.colors.open.white1 }}
        >
          <SegmentedControlIOS
            values={['Activities', 'Recipes']}
            selectedIndex={this.state.selectedIndex}
            tintColor={theme.colors.primary}
            onChange={this.handleSectionChange}
          />
        </View>

        {this.renderContent()}
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
