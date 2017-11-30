// @flow
import type { ActivityEdge, GraphQLDataProp, NavigationOptionsGetter } from 'core/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { compose, path, pathOr } from 'ramda';
import { gql, graphql } from 'react-apollo';
import displayLoadingState from '../components/displayLoadingState';
import { Screen } from '../components';
import ActivityList from './ActivityList';
import {
  withNetworkIndicator,
  withNetworkIndicatorActions,
} from 'core/helpers/graphqlUtils';

type Props = {
  navigation: NavigationProp<*>,
  activities: Array<ActivityEdge>,
  loadMoreEntries: () => void,
} & GraphQLDataProp<*>;

export class BrowseActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptionsGetter = ({ navigation }) => ({
    title: pathOr('All Activities', ['state', 'params', 'title'], navigation),
  });

  handleNavigate = (id: string, title: string) => {
    this.props.navigation.navigate('viewActivity', { id, title });
  };

  render() {
    return (
      <Screen>
        <ActivityList
          activities={this.props.activities}
          onActivityItemPress={this.handleNavigate}
          onLoadMore={this.props.loadMoreEntries}
          onRefresh={this.props.data.refetch}
        />
      </Screen>
    );
  }
}

const query = gql`
  query BrowseActivitiesList($cursor: String, $filter: ActivityFilterInput) {
    viewer {
      allActivities(first: 15, after: $cursor, filter: $filter) {
        edges {
          node {
            ...ActivityList
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${ActivityList.fragments.activities}
`;

export default compose(
  withNetworkIndicatorActions,
  graphql(query, {
    options: ownProps => ({
      variables: {
        filter: path(['navigation', 'state', 'params', 'filter'], ownProps),
      },
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
    }),
    props: ({ data, ownProps: { toggleNetworkActivityIndicator } }) => {
      const { fetchMore } = data;
      const activities = path(['viewer', 'allActivities', 'edges'], data);

      return {
        data,
        activities: activities || [],
        loadMoreEntries: withNetworkIndicator(
          toggleNetworkActivityIndicator,
          () => {
            return fetchMore({
              query,
              variables: {
                cursor: data.viewer.allActivities.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const { edges: newEdges, pageInfo } = fetchMoreResult.viewer.allActivities;

                return {
                  viewer: {
                    __typename: 'Viewer',
                    allActivities: {
                      __typename: 'ActivityConnection',
                      edges: [
                        ...previousResult.viewer.allActivities.edges,
                        ...newEdges,
                      ],
                      pageInfo,
                    },
                  },
                };
              },
            });
          },
        ),
      };
    },
  }),
  displayLoadingState,
)(BrowseActivities);
