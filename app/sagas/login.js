import { take, put, call, fork } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loginSuccess, loginFailure, logout } from '../actions/loginActions';
import api from '../services/mlb';

function loginCall({ email, password }) {
  return api.login(email, password);
}

function logoutCall(token) {
  return api.logout(token);
}

function* watchLoginRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    const { email, password } = yield take(types.LOGIN.REQUEST);

    try {
      const payload = {
        email,
        password,
      };
      const response = yield call(loginCall, payload);

      yield put(loginSuccess(response));
    } catch (err) {
      yield put(loginFailure(err));
    }
  }
}

function* watchLogoutRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    const { token } = yield take(types.LOGOUT);

    try {
      yield call(logoutCall, token);
      yield put(logout());
    } catch (err) {
      yield put(loginFailure(err.status));
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchLogoutRequest);
}
