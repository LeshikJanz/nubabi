// @flow
import type { Action, AuthProvider, AuthProviderData, Deps } from '../types';
import { Observable } from 'rxjs/Observable';
import { prop } from 'ramda';
import { resetNavigation } from '../navigation/actions';

export function loginRequest(
  emailOrProviderData: string | AuthProviderData,
  passwordOrProvider: string | AuthProvider,
): Action {
  let providerData;
  let provider: AuthProvider;

  if (typeof emailOrProviderData === 'string') {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(
        "DEPRECATED: loginRequest should take arguments in form loginRequest(providerData, provider). Invocations with (email, password) will be removed in the next major version. Use loginRequest({ email, password }, 'email') instead.",
      );
    }

    providerData = {
      email: emailOrProviderData,
      password: passwordOrProvider,
    };
    provider = 'email';
  } else {
    providerData = emailOrProviderData;
    // $FlowFixMe$
    provider = passwordOrProvider;
  }

  // $FlowFixMe$
  return {
    type: 'LOGIN_REQUEST',
    payload: providerData,
    meta: {
      provider,
    },
  };
}

export function loginSuccess({
  email,
  uid,
}: {
  email: string,
  uid: string,
}): Action {
  return {
    type: 'LOGIN_SUCCESS',
    payload: { email },
    meta: {
      token: uid,
    },
  };
}

export function loginFailure(err: Error): Action {
  return {
    type: 'LOGIN_FAILURE',
    payload: err,
    error: true,
  };
}

export function logout(): Action {
  return {
    type: 'LOGOUT',
  };
}

const signInWithEmailAndPassword = (firebaseAuth, action) => {
  const { email, password } = action.payload;
  return firebaseAuth().signInWithEmailAndPassword(email, password);
};

export const getProviderClass = (provider: string) => {
  const providerName = provider.toUpperCase();
  switch (providerName) {
    case 'FACEBOOK':
      return 'FacebookAuthProvider';
    default:
      return null;
  }
};

const signInWithProvider = (firebaseAuth, action) => {
  return new Promise((resolve, reject) => {
    const { provider: providerName } = action.meta;
    const provider = getProviderClass(providerName);
    let accessToken;

    if (providerName === 'facebook') {
      accessToken = prop('accessToken', action.payload);
    }

    if (!provider) {
      reject(new Error('Tried to authenticate with unknown provider'));
    }

    if (!accessToken) {
      reject(
        new Error('An access token was not retrieved. Sign in has failed.'),
      );
    }

    const credential = firebaseAuth[provider].credential(accessToken);
    firebaseAuth()
      .signInWithCredential(credential)
      .then(user => {
        // Only allow signups on web by specifying `allowSignup` meta property
        // to loginRequest.
        // We should have 2 providers here.
        if (action.meta.allowSignup !== true && user.providerData.length < 2) {
          user.delete();
          reject(
            new Error(
              "We couldn't find an existing user account with the information provided",
            ),
          );
        }

        resolve(user);
      })
      .catch(reject);
  });
};

const loginEpic = (action$: any, { firebaseAuth }: Deps) => {
  return action$
    .filter((action: Action) => action.type === 'LOGIN_REQUEST')
    .mergeMap(action => {
      const promise =
        action.meta.provider === 'email'
          ? signInWithEmailAndPassword
          : signInWithProvider;

      // $FlowFixMe$
      const signIn = Observable.from(promise(firebaseAuth, action)).map(
        firebaseUser => loginSuccess(firebaseUser),
      );

      return Observable.merge(
        signIn,
        action$
          .ofType('APP_ONLINE')
          .withLatestFrom(action$.ofType('GET_BABIES_SUCCESS'))
          .take(1)
          .mapTo(resetNavigation('home')),
      ).catch(err => Observable.of(loginFailure(err)));
    });
};

const logoutEpic = (action$: any, { firebaseAuth }: Deps) => {
  return action$
    .filter((action: Action) => action.type === 'LOGOUT')
    .mergeMap(() => Observable.fromPromise(firebaseAuth().signOut()))
    .mapTo(resetNavigation('login'));
};

export const epics = [loginEpic, logoutEpic];
