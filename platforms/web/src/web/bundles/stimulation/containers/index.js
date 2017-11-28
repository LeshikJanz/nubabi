import Stimulation from '../components/index';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';

const query = gql`
  query getBabyActivity($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        activities(first: 15) {
          edges {
            node {
              id
              name
              introduction
              skillArea {
                id
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
)(Stimulation);
