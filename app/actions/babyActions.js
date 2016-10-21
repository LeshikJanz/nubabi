import * as types from './actionTypes';

export function getBabiesRequest(token) {
  return {
    type: types.GET_BABIES.REQUEST,
    token,
  };
}

export function getBabiesSuccess(babies) {
  return {
    type: types.GET_BABIES.SUCCESS,
    babies,
  };
}

export function getBabiesFailure(err) {
  return {
    type: types.GET_BABIES.FAILURE,
    err,
  };
}
