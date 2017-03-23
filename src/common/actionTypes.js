const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const PUSH_ROUTE = 'PUSH_ROUTE';
export const POP_ROUTE = 'POP_ROUTE';
export const RESET_ROUTES = 'RESET_ROUTES';
export const CHANGE_TAB = 'CHANGE_TAB';
export const SET_SKILL_AREA = 'SET_SKILL_AREA';
export const NEXT_SKILL_AREA = 'NEXT_SKILL_AREA';
export const PREVIOUS_SKILL_AREA = 'PREVIOUS_SKILL_AREA';
export const TOGGLE_CHOOSE_BABY_MODAL = 'TOGGLE_CHOOSE_BABY_MODAL';

function createRequestTypes(base) {
  const res = {};

  [REQUEST, SUCCESS, FAILURE].forEach((type) => {
    res[type] = `${base}_${type}`;
  });

  return res;
}

export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = 'LOGOUT';

export const GET_BABIES = createRequestTypes('GET_BABIES');
export const GET_THIS_WEEKS_ACTIVITIES = createRequestTypes('GET_THIS_WEEKS_ACTIVITIES');
