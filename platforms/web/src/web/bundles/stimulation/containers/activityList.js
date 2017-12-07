import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import ActivityList from '../components/ActivityList';

export default compose(
  ShowNoContentViewIf(props => !props.activities),
  withRouter,
  withHandlers({
    handleNavigateToActivity: ({ history }) => ({ id }) =>
      history.push(`/stimulation/activity/${id}`),
  }),
)(ActivityList);
