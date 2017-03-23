import { POP_ROUTE, PUSH_ROUTE, CHANGE_TAB } from '../actionTypes';

export function push(route) : Action {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export function pop() : Action {
  return {
    type: POP_ROUTE,
  };
}

export function changeTab(index) : Action {
  return {
    type: CHANGE_TAB,
    payload: index,
  };
}
