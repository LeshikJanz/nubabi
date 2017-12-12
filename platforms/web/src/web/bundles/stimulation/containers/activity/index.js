import Activity from '../../components/activity/index';
import { gql, graphql } from 'react-apollo';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import path from 'ramda/src/path';
import DisplayLoadingState from 'web/components/displayLoadingState';
import { ActivityFragments } from '../../fragments/activity';
import withCurrentBaby from 'web/components/withCurrentBaby';
import { withRouter } from 'react-router-dom';

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
  withCurrentBaby,
  withRouter,
  withState('backLink', 'handleBackLink', null),
  withState('isSwitchable', 'handleSwitchability', false),
  lifecycle({
    componentDidMount() {
      const { location, handleBackLink, handleSwitchability } = this.props;

      // Remember back url if url was changed(switched on too difficult/too ease)
      if (location.state && location.state.backLink) {
        handleBackLink(location.state.backLink);
      }

      // Remember switchability if url was changed(switched on too difficult/too ease)
      if (location.state && location.state.switchable) {
        handleSwitchability(location.state.switchable);
      }
    },
  }),
  withHandlers({
    handleBackRedirect: ({ history, backLink }) => () =>
      backLink ? history.push(backLink) : history.goBack(),
  }),
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
      activity: path(['viewer', 'baby', 'activity'], data),
    }),
  }),
  DisplayLoadingState,
)(Activity);
