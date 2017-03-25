// @flow
import type { Action, AuthState } from '../types';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: '',
  errorMessage: '',
};

const reducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.meta.token,
        failure: false,
      });
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.payload.message,
      });
    case 'ON_AUTH': {
      // TODO: we need object-spread
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        isAuthenticated: !!action.payload.user,
        failure: false,
        errorMessage: null,
        token: action.payload.user ? action.payload.user.uid : '',
      });
    }
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default reducer;
