// @flow
import { Observable } from 'rxjs/Observable';
import firebase from 'react-native-firebase';

import type { Action } from 'core/types';

const notificationReceivedEpic = action$ => {
  const onMessage$ = Observable.create(observer => {
    const unsubscribe = firebase.messaging().onMessage(message => {
      observer.next({ type: 'NOTIFICATION_RECEIVED', payload: message });
    });

    return unsubscribe;
  });

  const streams: Array<any> = [onMessage$];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

export const epics = [notificationReceivedEpic];
