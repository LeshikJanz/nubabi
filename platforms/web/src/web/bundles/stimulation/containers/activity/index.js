import Activity from '../../components/activity/index';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { ActivityFragments } from '../../fragments/activity';

export const viewActivityQuery = gql`
    query ViewActivity($babyId: ID!, $activityId: ID!) {
        viewer {
            baby(id: $babyId) {
                id
                name
                activity(id: $activityId) {
                    isFavorite
                    ...Activity
                }
            }
        }
    }
    ${ActivityFragments.activity}
`;

export default compose(
  connect(({ babies, settings }) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
  graphql(viewActivityQuery, {
    options: ({ currentBabyId, match }) => ({
      variables: {
        babyId: currentBabyId,
        activityId: match.params.id,
      },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      refetch: data.refetch,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  DisplayLoadingState,
)(Activity);
