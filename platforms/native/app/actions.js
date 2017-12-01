// @flow
import type { Deps } from 'core/types';
import { Observable } from 'rxjs/Observable';
import { getBabiesRequest, getBabiesSuccess } from 'core/babies/actions';
import { gql } from 'react-apollo';
import firebase from 'react-native-firebase';
import { appOnline, appError } from 'core/app/actions';

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
              avatar {
                url
              }
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

const onAuthEpic = (action$: any, { firebase: firebaseWeb }) => {
  return action$
    .filter(action => action.type === 'ON_AUTH' && action.payload.user)
    .switchMap(action => {
      const userId = action.payload.user.uid;

      // Analytics
      firebase.analytics().setUserId(userId);
      firebase
        .analytics()
        .setUserProperty('user_email', action.payload.user.email);

      // Push notifications
      firebase.messaging().requestPermissions();
      firebase
        .messaging()
        .getToken()
        .then(token => {
          firebaseWeb.child(`/users/${userId}/pushToken`).set(token);
        });

      return Observable.of();
    });
};

export const epics = [appOnlineEpic, onAuthEpic];
