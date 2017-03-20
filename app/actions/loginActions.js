import * as types from './actionTypes';

export function loginRequest(email, password, uid) {
  return {
    type: types.LOGIN.REQUEST,
    email,
    password,
    uid,
  };
}

export function loginSuccess({ email, uid }) {
  return {
    type: types.LOGIN.SUCCESS,
    token: uid,
    email,
  };
}

export function loginFailure(err) {
  return {
    type: types.LOGIN.FAILURE,
    err,
  };
}

export function logout() {
  return {
    type: types.LOGOUT,
  };
}

