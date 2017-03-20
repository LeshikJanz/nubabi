import { take, put, call, fork } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { getBabiesSuccess, getBabiesFailure } from '../actions/babyActions';
import api from '../services/mlb';

function getBabies() {
  return api.getBabies();
}

function getThisWeeksActivities(babyId) {
  return api.getThisWeeksActivities(babyId);
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

function* watchGetThisWeeksActivitiesRequest(babyId) {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(types.GET_THIS_WEEKS_ACTIVITIES.REQUEST);

    try {
      const response = yield call(getThisWeeksActivities(babyId));

      yield put(getThisWeeksActivitiesSuccess(response));
    } catch (err) {
      yield put(getThisWeeksActivitiesFailure(err));
    }
  }
}

export default function* root() {
  yield fork(watchGetBabiesRequest);
}
