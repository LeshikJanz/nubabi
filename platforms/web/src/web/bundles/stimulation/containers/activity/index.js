import Activity from '../../components/activity/index';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';

const ACTIVITY_TEMP_ID = 'QWN0aXZpdHk6MTU1';
import { ActivityFragments } from '../../fragments/activity';

const query = gql`
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
  graphql(query, {
    options: ({ currentBabyId, match }) => ({
      variables: {
        babyId: currentBabyId,
        activityId: match.params.id || ACTIVITY_TEMP_ID,
      },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  DisplayLoadingState,
)(Activity);
