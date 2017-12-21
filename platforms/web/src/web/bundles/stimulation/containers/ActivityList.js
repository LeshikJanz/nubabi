import showNoContentViewIf from 'web/components/showNoContentViewIf';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import ActivityList from '../components/ActivityList';

export default compose(
  showNoContentViewIf(props => !props.activities.length),
  withRouter,
)(ActivityList);
