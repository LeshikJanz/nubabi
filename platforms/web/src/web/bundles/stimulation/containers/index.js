import { compose, withHandlers } from 'recompose';
import displayLoadingState from 'web/components/displayLoadingState';
import Stimulation from '../components/index';

export default compose(
  withHandlers({
    handleNavigate: ({ history }) => redirect => history.push(redirect),
  }),
  displayLoadingState,
)(Stimulation);
