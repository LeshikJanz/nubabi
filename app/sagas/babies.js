import { take, put, call, fork } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getBabiesSuccess, getBabiesFailure } from '../actions/loginActions';
import api from '../services/mlb';

function getBabies() {
  return api.getBabies();
}

function* watchGetBabiesRequest() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(types.GET_BABIES.REQUEST);

    try {
      const response = yield call(getBabies);

      yield put(getBabiesSuccess(response));
    } catch (err) {
      yield put(getBabiesFailure(err));
    }
  }
}

export default function* root() {
  yield fork(watchGetBabiesRequest);
}
