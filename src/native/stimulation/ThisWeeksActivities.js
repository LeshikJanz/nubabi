// @flow
import type {
  State,
  ActivityEdge,
  NavigationOptions,
} from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import displayLoadingState from '../components/displayLoadingState';
import { Screen } from '../components';
import ActivityList from './ActivityList';

type Props = {
  activities: Array<ActivityEdge>,
  navigation: NavigationProp<*, *>,
};

class ThisWeeksActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: "This Week's Activities",
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
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
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
