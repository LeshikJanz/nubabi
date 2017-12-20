import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import { ActivityFragments } from '../../fragments/activity';
import ActivityStatus from '../../components/activity/ActivityStatus';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { globalLoaderSuccess, globalLoaderError } from 'web/actions';

const refetchQueries = ['ThisWeeksActivitiesList', 'ViewActivity'];

const mapDispatchToProps = dispatch => ({
  handleGlobalLoadingSuccess: () => dispatch(globalLoaderSuccess),
  handleGlobalLoadingError: error => dispatch(globalLoaderError(error)),
});

export default compose(
  connect(null, mapDispatchToProps),
  graphql(
    gql`
        mutation SwoopActivity($input: SwoopActivityInput!) {
            swoopActivity(input: $input) {
                newActivity {
                    ...Activity
                }
                oldActivityId
            }
        }
        ${ActivityFragments.activity}
    `,
    { name: 'swoopActivity', options: { refetchQueries } },
  ),
  graphql(
    gql`
        mutation ChangeActivityLevel($input: AdjustActivityLevelInput!) {
            changeActivity(input: $input) {
                newActivity {
                    ...Activity
                }
                oldActivityId
            }
        }
        ${ActivityFragments.activity}
    `,
    { name: 'changeActivityLevel', options: { refetchQueries } },
  ),
  graphql(
    gql`
      mutation CompleteActivity($input: CompleteActivityInput!) {
        completeActivity(input: $input) {
          edge {
            node {
              id
            }
          }
        }
      }
    `,
    {
      name: 'completeActivity',
      options: {
        refetchQueries: ['ThisWeeksActivitiesList'],
      },
    },
  ),
  withCurrentBaby,
  withRouter,
)(ActivityStatus);
