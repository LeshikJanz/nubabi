import AppNavigator from './AppNavigator';

const reducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

export default reducer;
