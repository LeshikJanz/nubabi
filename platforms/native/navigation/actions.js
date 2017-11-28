// @flow
import { Observable } from 'rxjs';
import { NavigationActions } from 'react-navigation';
import { path } from 'ramda';

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

const resetNavigationEpic = (action$: any) => {
  return action$
    .ofType('NAVIGATION_RESET')
    .mergeMap(action =>
      Observable.of(
        resetNavigation(action.payload.routeName, action.payload.index),
      ),
    );
};

const returnKeyPath = path(['actions', '0', 'action']);

// Resets a tab navigation to a specific tab
// TODO: this is a workaround until we have time to patch TabsNavigator
const resetTabNavigatorEpic = (action$: any) => {
  return action$
    .filter(action => {
      return action.type === 'Navigation/RESET' && !!returnKeyPath(action);
    })
    .switchMap(action => {
      return Observable.of(returnKeyPath(action));
    });
};

const goBackAfterSubmitEpic = (action$: any) => {
  return action$
    .filter(
      action =>
        action.type === '@@redux-form/SET_SUBMIT_SUCCEEDED' &&
        action.meta &&
        action.meta.form === 'user',
    )
    .mapTo(NavigationActions.back());
};

const navigationAnalyticsEpic = (action$: any) => {
  const firebase = require('react-native-firebase').default;
  const { routes } = require('./AppNavigator').default;
  return action$
    .filter(action => {
      return (
        action.type === 'Navigation/NAVIGATE' ||
        action.type === 'Navigation/RESET'
      );
    })
    .mergeMap(action => {
      let routeName;
      if (action.type === 'Navigation/NAVIGATE') {
        // eslint-disable-next-line prefer-destructuring
        routeName = action.routeName;
      } else {
        // eslint-disable-next-line prefer-destructuring
        routeName = action.actions[0].routeName;
      }

      if (routeName) {
        firebase.analytics().setCurrentScreen(routeName);
      }

      const routeEvent = path([routeName, 'meta', 'analytics'], routes);
      if (routeEvent) {
        firebase.analytics().logEvent(routeEvent.eventName, action.params);
      }

      return Observable.of();
    });
};

export const epics = [
  resetNavigationEpic,
  goBackAfterSubmitEpic,
  resetTabNavigatorEpic,
  navigationAnalyticsEpic,
];
