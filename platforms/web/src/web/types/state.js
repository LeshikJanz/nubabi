// @flow
import type { Action } from "./actions";

export type AppState = {
  isFetching: boolean,
  failure: boolean
};

export type AuthState = {
  isLoggedIn: boolean,
  user: {
    id: ?number,
    firstName: ?string,
    lastName: ?string
  },
  isFetching: boolean,
  error: ?string,
  jwt: ?string
};

export type State = {
  +app: AppState,
  +router: Object,
  +auth: AuthState
};

export type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformReducers?: Object,
  platformMiddleware?: Array<Function>,
  platformStoreEnhancers?: Array<Function>
};

export type Dispatch = (action: Action) => void;
