import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import BrowseActivities from '../components/BrowseActivities';
import { withRouter } from 'react-router-dom';
import withCurrentBaby from 'web/components/withCurrentBaby';

const query = gql`
  query getSkillAreas {
    viewer {
      allSkillAreas {
        edges {
          node {
            id
            name
            icon
          }
        }
      }
    }
  }
`;

export default compose(
  withCurrentBaby,
  graphql(query, {
    props: ({ data }) => ({
      data,
      skillAreas: path(['viewer', 'allSkillAreas'], data),
    }),
  }),
  withRouter,
  withHandlers({
    handleSkillFilter: ({ history }) => skillId =>
      history.push(`/browse/skill/${skillId}`),
    handleCategoryFilter: ({ history }) => categoryId =>
      history.push(`/browse/category/${categoryId}`),
  }),
  DisplayLoadingState,
)(BrowseActivities);
