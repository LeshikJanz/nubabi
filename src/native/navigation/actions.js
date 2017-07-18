// @flow
import type { Deps } from '../../common/types';
import { Observable } from 'rxjs';
import { NavigationActions } from 'react-navigation';

export const resetNavigation = (routeName: string, index?: number = 0) =>
  NavigationActions.reset({
    index,
    actions: [NavigationActions.navigate({ routeName })],
  });

export const navigate = (routeName: string, params: Object = {}) => {
  return NavigationActions.navigate({
    routeName,
    params,
    action: NavigationActions.navigate({ routeName, params }),
  });
};

const resetNavigationEpic = (action$: any, deps: Deps) => {
  return action$
    .ofType('NAVIGATION_RESET')
    .mergeMap(action =>
      Observable.of(
        resetNavigation(action.payload.routeName, action.payload.index),
      ),
    );
};

export const epics = [resetNavigationEpic];
