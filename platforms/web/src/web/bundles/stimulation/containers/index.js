import Stimulation from '../components/index';
import { compose, withHandlers } from 'recompose';
import DisplayLoadingState from 'web/components/displayLoadingState';

export default compose(
  withHandlers({
    handleNavigate: ({ history }) => redirect => history.push(redirect),
  }),
  DisplayLoadingState,
)(Stimulation);
