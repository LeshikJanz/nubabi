// @flow
import type {
  ActivityEdge,
  GraphQLDataProp,
  NavigationOptions,
} from 'core/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { displayLoadingState, Screen, withCurrentBaby } from '../components';
import ActivityList from './ActivityList';

type Props = {
  activities: Array<ActivityEdge>,
  navigation: NavigationProp<*, *>,
} & GraphQLDataProp<*>;

class ThisWeeksActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: "This Week's Stimulation Guide",
    headerBackTitle: 'Activities',
  };

  handleThisWeeksActivity = (id: string, title: string, cursor: string) => {
    this.props.navigation.navigate('viewThisWeeksActivity', {
      id,
      title,
      cursor,
    });
  };

  render() {
    return (
      <Screen>
        <ActivityList
          activities={this.props.activities}
          onActivityItemPress={this.handleThisWeeksActivity}
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
      query ThisWeeksActivitiesList($babyId: ID!) {
        viewer {
          baby(id: $babyId) {
            id
            activities {
              edges {
                cursor
                node {
                  ...ActivityList
                  isCompleted
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
        return {
          data,
          activities: path(['viewer', 'baby', 'activities', 'edges'], data),
        };
      },
    },
  ),
  displayLoadingState,
)(ThisWeeksActivities);
