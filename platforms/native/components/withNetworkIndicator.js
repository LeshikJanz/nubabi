// @flow
import { curry } from 'ramda';
import { connect } from 'react-redux';
import { toggleNetworkActivityIndicator } from '../../../core/ui/reducer';

export const withNetworkIndicator = curry(
  (
    networkIndicatorToggler: typeof toggleNetworkActivityIndicator,
    operation: () => Promise<*>,
  ) => () => {
    networkIndicatorToggler(true);
    // $FlowFixMe$
    return operation().finally(() => networkIndicatorToggler(false));
  },
);

export const withNetworkIndicatorActions = connect(null, {
  toggleNetworkActivityIndicator,
});
