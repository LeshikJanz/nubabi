import { compose, withState, lifecycle, withHandlers } from 'recompose';
import ActivityMenu from '../../components/activity/ActivityMenu';

export default compose(
  withState('isActivityMenuOpen', 'handleActivityMenu', true),
  withHandlers({
    selectActivity: ({ handleActivityMenu, handleActivity }) => a => {
      if (a.type !== 'done') {
        window.scrollTo(0, 0);
      }

      handleActivityMenu(false);
      handleActivity(a);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.handleActivityMenu(!this.props.isCompleted);
    },
  }),
)(ActivityMenu);
