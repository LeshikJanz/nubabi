// @flow
import type { Action, Deps } from "../types";
import { Observable } from "rxjs/Observable";
import { resetNavigation } from "../navigation/actions";

export function loginRequest(email, password, uid): Action {
  return {
    type: "LOGIN_REQUEST",
    payload: {
      email,
      password
    },
    meta: {
      uid
    }
  };
}

export function loginSuccess({ email, uid }): Action {
  return {
    type: "LOGIN_SUCCESS",
    payload: { email },
    meta: {
      token: uid
    }
  };
}

export function loginFailure(err): Action {
  return {
    type: "LOGIN_FAILURE",
    payload: err,
    error: true
  };
}

export function logout(): Action {
  return {
    type: "LOGOUT"
  };
}

const loginEpic = (action$: any, { firebaseAuth }: Deps) => {
  const signInWithEmailAndPassword = options => {
    const { email, password } = options;
    const promise = firebaseAuth().signInWithEmailAndPassword(email, password);

    return Observable.from(promise)
      .map(firebaseUser => loginSuccess(firebaseUser))
      .catch(err => Observable.of(loginFailure(err)));
  };

  return action$
    .filter((action: Action) => action.type === "LOGIN_REQUEST")
    .mergeMap(action => {
      return Observable.merge(
        signInWithEmailAndPassword(action.payload),
        action$
          .ofType("APP_ONLINE")
          .withLatestFrom(action$.ofType("GET_BABIES_SUCCESS"))
          .take(1)
          .mapTo(resetNavigation("home"))
      );
    });
};

const logoutEpic = (action$: any, { firebaseAuth, apollo }: Deps) => {
  return action$
    .filter((action: Action) => action.type === "LOGOUT")
    .mergeMap(() =>
      Observable.fromPromise(firebaseAuth().signOut()).catch(e => {
        console.log("Signout error", e);
        return Observable.just({ error: e });
      })
    )
    .mapTo(resetNavigation("login"))
    .catch(err => console.log(err));
};

export const epics = [loginEpic, logoutEpic];
