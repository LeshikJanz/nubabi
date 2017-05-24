// @flow
import type { Activity, NavigationOptions } from '../../common/types';
import type { NavigationProp } from 'react-navigation';
import React, { PureComponent } from 'react';
import { compose, path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import displayLoadingState from '../components/displayLoadingState';
import { Screen } from '../components';
import ActivityList from './ActivityList';
import mapEdgesToProp from '../shared/mapEdgesToProp';

type Props = {
  navigation: NavigationProp<*>,
  activities: Array<Activity>,
  loadMoreEntries: () => void,
};

export class BrowseActivities extends PureComponent {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: 'All Activities',
  };

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
        />
      </Screen>
    );
  }
}

const query = gql`
  query BrowseActivities($cursor: String) {
    viewer {
      allActivities(first: 15, after: $cursor) {
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
  graphql(query, {
    options: {
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
    },
    props: ({ data }) => {
      const { fetchMore } = data;

      return {
        ...mapEdgesToProp('viewer.allActivities.edges', 'activities', data),
        loadMoreEntries: () => {
          return fetchMore({
            query,
            variables: {
              cursor: data.viewer.allActivities.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.viewer.allActivities.edges;
              const pageInfo = fetchMoreResult.viewer.allActivities.pageInfo;

              return {
                viewer: {
                  allActivities: {
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
      };
    },
  }),
  displayLoadingState,
)(BrowseActivities);
