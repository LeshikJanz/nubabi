// @flow
import { GraphQLDataProp } from '../../common/types';
import { compose, tap } from 'ramda';
import {
  withHandlers,
  withState,
  hoistStatics,
  setDisplayName,
} from 'recompose';
import { withNetworkIndicatorActions } from '../../common/helpers/graphqlUtils';
import { toggleNetworkActivityIndicator } from '../../common/ui/reducer';

export type PullToRefreshProps = {
  onRefresh: () => Promise<*>,
  refreshing: boolean,
  toggleNetworkActivityIndicator: typeof toggleNetworkActivityIndicator,
  handleRefresh: () => void,
  data: GraphQLDataProp<*>,
};

export const withPullToRefresh = hoistStatics(
  compose(
    withNetworkIndicatorActions,
    withState('refreshing', 'setRefreshing', false),
    withHandlers({
      handleRefresh: ({
        data,
        onRefresh,
        setRefreshing,
        toggleNetworkActivityIndicator,
      }) => () => {
        const toggle = compose(
          tap(setRefreshing),
          tap(toggleNetworkActivityIndicator),
        );
        toggle(true);

        let refreshFn =
          typeof onRefresh === 'function'
            ? onRefresh
            : data && typeof data.refetch === 'function' && data.refetch;

        if (!refreshFn) {
          if (__DEV__) {
            console.warn('Not given a refresh function, will do nothing');
          }

          refreshFn = Promise.resolve;
        }
        refreshFn().finally(() => toggle(false));
      },
    }),
  ),
);

export default withPullToRefresh;
