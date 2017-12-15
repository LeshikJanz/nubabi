import {
  getProviderClass,
  loginRequest,
  loginSuccess,
  signInWithEmailAndPassword,
} from '../actions';

describe('auth actions', () => {
  describe('loginRequest', () => {
    it('creates LOGIN_REQUEST action', () => {
      expect(
        loginRequest(
          {
            email: 'foo@example.com',
            password: 'foo',
          },
          'email',
        ),
      ).toMatchSnapshot();
    });

    it('handles deprecated form', () => {
      expect(loginRequest('foo@example.com', 'foo')).toEqual(
        loginRequest({ email: 'foo@example.com', password: 'foo' }, 'email'),
      );
    });
  });

  describe('loginSuccess', () => {
    it('creates LOGIN_SUCCESS action', () => {
      expect(loginSuccess('foo@example.com', 'UUID')).toMatchSnapshot();
    });
  });
});

describe('signInWithEmailAndPassword', () => {
  it('invokes email sign in on Firebase', () => {
    const signInWithEmailAndPasswordMock = jest.fn();
    const firebaseAuth = () => ({
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
    });
    signInWithEmailAndPassword(firebaseAuth, {
      payload: {
        email: 'foo@example.com',
        password: 'pass',
      },
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      'foo@example.com',
      'pass',
    );
  });
});

describe('getProviderClass', () => {
  it('returns Firebase class for facebook provider', () => {
    expect(getProviderClass('FACEBOOK')).toEqual('FacebookAuthProvider');
  });

  it('returns null if no provider is found', () => {
    expect(getProviderClass('PINTEREST')).toBe(null);
  });
});
