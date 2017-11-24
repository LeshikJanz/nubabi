import { Stimulation } from '../components/index';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';

const query = gql`
  query getBaby($id: ID!) {
    viewer {
      baby(id: $id) {
        id
        name
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
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
)(Stimulation);
