import { gql, graphql } from 'react-apollo';
import { compose, withState, withProps } from 'recompose';
import path from 'ramda/src/path';
import displayLoadingState from 'web/components/displayLoadingState';
import FilteredActivities from '../components/FilteredActivities';
import { ActivityListFragment } from '../fragments/activity';
import { toGlobalId } from 'graphql-relay';
import { withRouter } from 'react-router-dom';

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
  withState('isFetching', 'handleFetch', false),
  withRouter,
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        filter: { categories: toGlobalId('Category', [match.params.id]) },
      },
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
    }),
    props: ({ data, ownProps }) => {
      const { fetchMore } = data;

      return {
        data,
        activities: path(['viewer', 'allActivities', 'edges'], data) || [],
        getCurrentCategory: () => {
          switch (+ownProps.match.params.id) {
            case 1:
              return 'Indoors';
            case 2:
              return 'Outdoors';
            default:
              return 'Custom Filter';
          }
        },
        loadMoreEntries: () => {
          if (!ownProps.isFetching) {
            ownProps.handleFetch(true);
            return fetchMore({
              query,
              variables: {
                filter: {
                  categories: toGlobalId('Category', [
                    ownProps.match.params.id,
                  ]),
                },
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
  withProps(({ getCurrentCategory }) => ({
    category: getCurrentCategory(),
  })),
  withProps(({ category }) => ({
    categoryName: category && category.node ? category.node.name : category,
  })),
  displayLoadingState,
)(FilteredActivities);
