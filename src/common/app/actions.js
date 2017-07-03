// @flow
import { Observable } from 'rxjs/Observable';
import { getBabiesRequest, getBabiesSuccess } from '../babies/actions';
import { gql } from 'react-apollo';
import { query as chooseBabyQuery } from '../../native/profile/ChooseBaby';
import type {
  Action,
  AppOnlineAction,
  AppErrorAction,
  OnAuthAction,
  Deps,
  FirebaseUser,
} from '../types';

export const appError = (error: Object): AppErrorAction => ({
  type: 'APP_ERROR',
  payload: error,
  error: true,
});

export const appOnline = (online: boolean): AppOnlineAction => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const onAuth = (user: ?FirebaseUser, token?: string): OnAuthAction => ({
  type: 'ON_AUTH',
  payload: { user, token },
});

// We will get rid of this once we standarize data fetching
const appOnlineEpic = (action$: any, deps: Deps) => {
  return action$.ofType('ON_AUTH').switchMap(() => {
    const { getState, apollo } = deps;
    const state = getState();

    if (state.auth.isAuthenticated) {
      // TODO: remove from here, this should be a client concern
      // so we should handle on SplashScreen and Profile (initial tab)
      const fetchBabiesQuery = gql`
        query getBabies {
          viewer {
            user {
              id
            }
            babies {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      `;

      return Observable.merge(
        Observable.of(getBabiesRequest()),
        // $FlowFixMe
        Observable.zip(
          Observable.fromPromise(apollo.query({ query: fetchBabiesQuery })),
        ).mergeMap(([fetchBabiesResult]) => [
          getBabiesSuccess(
            fetchBabiesResult.data.viewer.babies.edges.map(edge => edge.node),
          ),
          appOnline(true),
        ]),
      ).catch(err => Observable.of(appError(err)));
    }

    return Observable.of(appOnline(true));
  });
};

const appStartedEpic = (action$: any, deps: Deps) => {
  const { firebaseAuth } = deps;

  const onAuth$ = Observable.create(observer => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        firebaseAuth().currentUser.getToken().then(token => {
          observer.next(onAuth(firebaseUser, token));
        });
      } else {
        observer.next(onAuth(firebaseUser));
      }
    });
    return unsubscribe;
  });

  const streams: Array<any> = [onAuth$];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

export const epics = [appStartedEpic, appOnlineEpic];
