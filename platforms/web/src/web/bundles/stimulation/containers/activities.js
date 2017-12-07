import { compose, withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { ACTIVITY_FILTERS } from 'web/bundles/stimulation/constants';
import Activities from '../components/Activities';

export default compose(
  withRouter,
  withState('selectedFilter', 'handleFilter', ACTIVITY_FILTERS.weeks),
  withHandlers({
    handleNavigate: ({ history }) => redirect => history.push(redirect),
  }),
)(Activities);
