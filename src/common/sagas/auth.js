import { take, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actionTypes';
import {
  loginSuccess,
  loginFailure,
  logout,
} from '../auth/actions';
import { getBabiesSuccess, getBabiesRequest } from '../babies/actions';
import api from '../connectors/mlb';
import firebase from '../connectors/firebase';

function loginCall({ email, password }) {
  return firebase.login(email, password);
}

function logoutCall() {
  return firebase.logout();
}

function getBabies() {
  return api.getBabies();
}

function* watchLoginRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    const loginAction = yield take(types.LOGIN.REQUEST);

    try {
      const { email, password } = loginAction.payload;

      const payload = {
        email,
        password,
      };

      const loginResponse = yield call(loginCall, payload);

      const babiesResponse = yield call(getBabies);
      yield put(getBabiesSuccess(babiesResponse));
      yield put(loginSuccess(loginResponse));
    } catch (err) {
      yield put(loginFailure(err));
    }
  }
}

function* watchLogoutRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    //  We will use token eventually
    yield take(types.LOGOUT);

    try {
      yield call(logoutCall);
      yield put(logout());
    } catch (err) {
      yield put(loginFailure(err.status));
    }
  }
}

function* watchFirebaseAuthStatus() {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take('ON_AUTH');
    const appState = yield select(state => state.app);

    if (appState.started) {
      if (!appState.online) {
        yield put({ type: 'APP_ONLINE', payload: { online: true } });
      }
    }

    if (action.payload.user) {
      // We're using app online to determine when firebase got loaded
      // we probably need to change this and Root, and instead
      // track connectivity/presence with this, so we currently kind of
      // mock that

      // If this is the first time this runs we mark the app as online
      // ensure we loaded our store
      yield put(getBabiesRequest(action.payload.user.uid));
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchLogoutRequest);
  yield fork(watchFirebaseAuthStatus);
}
