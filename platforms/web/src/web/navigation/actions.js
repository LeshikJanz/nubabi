// @flow
import type { Deps } from "../../common/types";
import { Observable } from "rxjs";
import history from "web/navigation/history";

export const resetNavigation = (routeName: string, index?: number = 0) => {
  return history.push(routeName);
};

export const navigate = (routeName: string, params: Object = {}) => {
  return history.push(routeName);
};

const resetNavigationEpic = (action$: any, deps: Deps) => {
  console.log(deps);
  console.log("RESET");
  return action$
    .ofType("NAVIGATION_RESET")
    .mergeMap(action =>
      Observable.of(
        resetNavigation(action.payload.routeName, action.payload.index)
      )
    );
};

export const epics = [resetNavigationEpic];
