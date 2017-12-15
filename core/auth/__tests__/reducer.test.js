import reducer, { initialState } from '../reducer';
import { loginFailure, loginRequest, loginSuccess, logout } from '../actions';
import { onAuth } from '../../app/actions';

describe('auth reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT'})).toMatchSnapshot();
  });

  it('handles LOGIN_REQUEST', () => {
    expect(
      reducer(
        initialState,
        loginRequest({ email: 'foo@example.com', password: 'foo' }, 'email'),
      ),
    ).toMatchSnapshot();
  });

  it('handles LOGIN_SUCCESS', () => {
    expect(
      reducer(initialState, loginSuccess('foo@example.com', 'FIREBASE_UID')),
    ).toMatchSnapshot();
  });

  it('handles LOGIN_FAILURE', () => {
    expect(
      reducer(initialState, loginFailure(new Error('some error'))),
    ).toMatchSnapshot();
  });

  it('handles ON_AUTH when logged in', () => {
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

  it('handles ON_AUTH when logged out', () => {
    expect(reducer(initialState, onAuth())).toMatchSnapshot();
  });

  it('handles LOGOUT', () => {
    expect(reducer(initialState, logout())).toMatchSnapshot();
  });
});
