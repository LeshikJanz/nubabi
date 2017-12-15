// @flow
import type { AppState, GlobalLoaderAction } from 'web/types';

export const initialState: AppState = {
  isFetching: false,
  error: null,
};

const useGlobalLoader = (action: GlobalLoaderAction) => {
  if ('payload' in action && 'useGlobalLoader' in action.payload) {
    return action.payload.useGlobalLoader;
  }
  return true;
};

const reducer = (
  state: AppState = initialState,
  action: GlobalLoaderAction,
) => {
  if (action.type.endsWith('/REQUEST') && useGlobalLoader(action)) {
    return {
      ...state,
      isFetching: true,
    };
  }
  if (action.type.endsWith('/SUCCESS') && useGlobalLoader(action)) {
    return {
      ...state,
      isFetching: false,
    };
  }
  if (action.type.endsWith('/ERROR') && useGlobalLoader(action)) {
    return {
      ...state,
      isFetching: false,
      failure: true,
    };
  }
  if (action.type === 'NAVIGATION_RESET') {
    return {
      ...state,
      isFetching: false,
    };
  }
  return state;
};

export default reducer;
