import { take, put, call, fork, select } from 'redux-saga/effects';
import * as types from '../actionTypes';
import {
  loginSuccess,
  loginFailure,
} from '../auth/actions';
import { getBabiesSuccess, getBabiesRequest } from '../babies/actions';
import firebase from '../connectors/firebase';

/*
  FIXME: this is NOT cross-platform, the only reason is here is to be able
  to switch navigation without having the components do it themselves, or
  introduce flicker-ness.
  I haven't been able to pass context-like options to redux-saga, like
  we can with redux-observable's combineEnics.
 */
import { resetNavigation } from '../../native/navigation/actions';

function loginCall({ email, password }) {
  return firebase.login(email, password);
}

function logoutCall() {
  return firebase.logout();
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
      yield put(getBabiesRequest(loginResponse.uid));
      yield take(getBabiesSuccess);
      yield put(loginSuccess(loginResponse));
      yield put(resetNavigation('home'));
    } catch (err) {
      yield put(loginFailure(err));
    }
  }
}

function* watchLogoutRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    //  We will use token eventually
    yield take('LOGOUT');

    try {
      yield call(logoutCall);
      yield put(resetNavigation('login'));
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
        if (action.payload.user) {
          yield put(getBabiesRequest(action.payload.user.uid));
          yield take(getBabiesSuccess);
        }

        // We're using app online to determine when firebase got loaded
        // we probably need to change this and Root, and instead
        // track connectivity/presence with this, so we currently kind of
        // mock that

        // If this is the first time this runs we mark the app as online
        // ensure we loaded our store
        yield put({ type: 'APP_ONLINE', payload: { online: true } });
      }
    }
  }
}

export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchLogoutRequest);
  yield fork(watchFirebaseAuthStatus);
}
