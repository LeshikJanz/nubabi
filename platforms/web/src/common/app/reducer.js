// @flow
import type { Action, AppState } from "../types";

export const initialState: AppState = {
  started: false,
  online: false,
  error: null,
  success: null
};

const reducer = (state: AppState = initialState, action: Action): AppState => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (action.type.endsWith("_FAILURE")) {
    // $FlowFixMe
    state = { ...state, error: action.payload }; // eslint-disable-line no-param-reassign
  }

  switch (action.type) {
    case "APP_ONLINE":
      return { ...state, error: null, online: action.payload.online };

    case "APP_STARTED":
      return { ...state, started: true };

    case "APP_ERROR":
      return { ...state, error: action.payload };

    case "APP_SUCCESS": {
      return { ...state, error: null, success: action.payload };
    }

    case "APP_INFO": {
      return { ...state, error: null, info: action.payload };
    }

    case "ALERT_SHOWN": {
      return { ...state, error: null, success: null };
    }

    default:
      return state;
  }
};

export default reducer;
