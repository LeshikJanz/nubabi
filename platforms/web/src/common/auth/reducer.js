// @flow
import type { Action, AuthState } from "../types";
import merge from "ramda/src/merge";

export const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: null,
  errorMessage: ""
};

const reducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return merge(state, {
        isFetching: true,
        isAuthenticated: false
      });
    case "LOGIN_SUCCESS":
      return merge(state, {
        isFetching: false,
        isAuthenticated: true
      });
    case "LOGIN_FAILURE":
      return merge(state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload.message
      });
    case "ON_AUTH": {
      return merge(state, {
        isFetching: false,
        isAuthenticated: !!action.payload.user,
        errorMessage: null,
        token: action.payload.token
      });
    }
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
