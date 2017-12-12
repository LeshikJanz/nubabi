import ShowNoContentViewIf from 'web/components/showNoContentViewIf';
import { compose, withHandlers, lifecycle } from 'recompose';
import { withRouter } from 'react-router-dom';
import ActivityList from '../components/ActivityList';
import { MIN_Y_OFFSET } from '../../../constants/index';

export default compose(
  ShowNoContentViewIf(props => !props.activities),
  withRouter,
  withHandlers({
    handleNavigateToActivity: ({ history }) => ({ id }) =>
      history.push(`/activity/${id}`),
    getScrollHeight: () => () =>
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ),
    getPageYOffset: () => () => window.pageYOffset,
  }),
  withHandlers({
    handleScroll: ({ getPageYOffset, getScrollHeight, onLoadMore }) => () => {
      const isNeededMoreEntities =
        getScrollHeight() - getPageYOffset() - MIN_Y_OFFSET <= 0;

      if (onLoadMore && isNeededMoreEntities) {
        onLoadMore();
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('scroll', this.props.handleScroll, false);
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', this.props.handleScroll, false);
    },
  }),
)(ActivityList);
