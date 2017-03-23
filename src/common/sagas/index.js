import { fork } from 'redux-saga/effects';

import auth from './auth';
import babies from './babies';

export default function* root() {
  yield fork(auth);
  yield fork(babies);
}
