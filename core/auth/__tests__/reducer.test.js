import reducer, { initialState } from '../reducer';
import { loginFailure, loginRequest, loginSuccess, logout } from '../actions';
import { onAuth } from '../../app/actions';

test('handles LOGIN_REQUEST', () => {
  expect(
    reducer(initialState, loginRequest('foo@example.com', 'foo')),
  ).toMatchSnapshot();
});

test('handles LOGIN_SUCCESS', () => {
  expect(
    reducer(initialState, loginSuccess('foo@example.com', 'FIREBASE_UID')),
  ).toMatchSnapshot();
});

test('handles LOGIN_FAILURE', () => {
  expect(
    reducer(initialState, loginFailure(new Error('some error'))),
  ).toMatchSnapshot();
});

test('handles ON_AUTH when logged in', () => {
  expect(
    reducer(
      initialState,
      onAuth(
        {
          email: 'foo@example.com',
          uid: 'FIREBASE_UID',
        },
        'FIREBASE_TOKEN',
      ),
    ),
  ).toMatchSnapshot();
});

test('handles ON_AUTH when logged out', () => {
  expect(reducer(initialState, onAuth())).toMatchSnapshot();
});

test('handles LOGOUT', () => {
  expect(reducer(initialState, logout())).toMatchSnapshot();
});
