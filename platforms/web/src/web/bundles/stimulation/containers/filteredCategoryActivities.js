import { gql, graphql } from 'react-apollo';
import { compose, withState } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import FilteredActivities from '../components/FilteredActivities';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { ActivityListFragment } from '../fragments/activity';

const query = gql`
    query getSkillActivities($cursor: String, $filter: ActivityFilterInput) {
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
    ${ActivityListFragment.activities}
`;

export default compose(
  withCurrentBaby,
  withState('isFetching', 'handleFetch', false),
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        filter: { skillAreas: [match.params.id] },
      },
    }),
    props: ({ data, ownProps }) => {
      const { fetchMore } = data;
      const activities = path(['viewer', 'allActivities', 'edges'], data);

      return {
        data,
        activities: activities || [],
        loadMoreEntries: () => {
          if (!ownProps.isFetching) {
            ownProps.handleFetch(true);
            return fetchMore({
              query,
              variables: {
                cursor: data.viewer.allActivities.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const {
                  edges: newEdges,
                  pageInfo,
                } = fetchMoreResult.viewer.allActivities;

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
            }).then(() => ownProps.handleFetch(false));
          }
          return null;
        },
      };
    },
  }),
  DisplayLoadingState,
)(FilteredActivities);
