import type { Action } from '../types';
import * as types from '../actionTypes';

export function loginRequest(email, password, uid): Action {
  return {
    type: 'LOGIN_REQUEST',
    payload: {
      email,
      password,
    },
    meta: {
      uid,
    },
  };
}

export function loginSuccess({ email, uid }): Action {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { email },
    meta: {
      token: uid,
    },
  };
}

export function loginFailure(err) : Action {
  return {
    type: 'LOGIN_FAILURE',
    payload: err,
    error: true,
  };
}

export function logout() : Action {
  return {
    type: 'LOGOUT',
  };
}

