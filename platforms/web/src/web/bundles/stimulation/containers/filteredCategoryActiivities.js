import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import FilteredActivities from '../components/FilteredActivities';
import { toGlobalId } from 'graphql-relay';
import withCurrentBaby from 'web/components/withCurrentBaby';

const query = gql`
  query getCategoryActivities($categories: [ID!]) {
    viewer {
      allActivities(filter: { categories: $categories }) {
        edges {
          node {
            id
            name
            skillArea {
              id
              name
              icon
              image {
                thumb {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    options: ({ match }) => ({
      variables: { $categories: toGlobalId('Category', [match.params.id]) },
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'allActivities'], data),
    }),
  }),
  DisplayLoadingState,
)(FilteredActivities);
