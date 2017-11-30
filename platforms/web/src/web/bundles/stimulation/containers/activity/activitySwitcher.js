import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import ActivitySwitcher from '../../components/activity/ActivitySwitcher';

const query = gql`
  query getBabyActivity($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        activities(first: 1000) {
          edges {
            node {
              id
              name
            }
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
    options: ({ currentBabyId }) => ({
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  DisplayLoadingState,
)(ActivitySwitcher);
