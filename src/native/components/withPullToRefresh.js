// @flow
import { compose, tap } from 'ramda';
import { withHandlers, withState } from 'recompose';
import { withNetworkIndicatorActions } from '../../common/helpers/graphqlUtils';

export default compose(
  withNetworkIndicatorActions,
  withState('refreshing', 'setRefreshing', false),
  withHandlers({
    handleRefresh: ({
      onRefresh,
      setRefreshing,
      toggleNetworkActivityIndicator,
    }) => () => {
      const toggle = compose(
        tap(setRefreshing),
        tap(toggleNetworkActivityIndicator),
      );
      toggle(true);

      onRefresh().finally(() => toggle(false));
    },
  }),
);
