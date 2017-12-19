// @flow
import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import ActivityMenu from '../../components/activity/ActivityMenu';
import { globalLoaderInit } from 'web/actions';
import { connect } from 'react-redux';
import FinishedActivityButton from '../../containers/activity/FinishedActivityButton';

const mapDispatchToProps = dispatch => ({
  runGlobalLoading: () => dispatch(globalLoaderInit),
});

export default compose(
  connect(null, mapDispatchToProps),
  withState('isActivityMenuOpen', 'handleActivityMenu', true),
  withHandlers({
    selectActivity: ({
      handleActivity,
      runGlobalLoading,
      handleActivityMenu,
    }) => a => {
      runGlobalLoading();

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
  branch(
    ({ isCompleted, isActivityMenuOpen }) => isCompleted && !isActivityMenuOpen,
    renderComponent(FinishedActivityButton),
  ),
)(ActivityMenu);
