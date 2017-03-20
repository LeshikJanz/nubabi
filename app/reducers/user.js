import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: '',
  user: {},
  errorMessage: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case types.LOGIN.SUCCESS:
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        failure: false,
        user: action,
      });
    case types.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err.errorMessage,
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
