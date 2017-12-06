import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import BrowseActivities from '../components/BrowseActivities';
import { withRouter } from 'react-router-dom';

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
  connect(({ babies, settings }) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
  graphql(query, {
    props: ({ data }) => ({
      data,
      skillAreas: path(['viewer', 'allSkillAreas'], data),
    }),
  }),
  withRouter,
  withHandlers({
    handleSkillFilter: ({ history }) => skillId =>
      history.push(`/stimulation/browse/skill/${skillId}`),
    handleCategoryFilter: ({ history }) => categoryId =>
      history.push(`/stimulation/browse/category/${categoryId}`),
  }),
  DisplayLoadingState,
)(BrowseActivities);
