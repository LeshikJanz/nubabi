import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import FilteredActivities from '../components/FilteredActivities';
import withCurrentBaby from 'web/components/withCurrentBaby';

const query = gql`
  query getSkillActivities($skillAreas: [ID!]) {
    viewer {
      allActivities(filter: { skillAreas: $skillAreas }) {
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
      variables: { skillAreas: [match.params.id] },
    }),
    props: ({ data }) => ({
      data,
      activities: path(['viewer', 'allActivities'], data),
    }),
  }),
  DisplayLoadingState,
)(FilteredActivities);
