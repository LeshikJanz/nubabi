// @flow
import type { State, Action } from '../../common/types';
import AppNavigator from './AppNavigator';

const reducer = (state: State, action: Action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default reducer;
