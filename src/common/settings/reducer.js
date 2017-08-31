// @flow
import type { SettingsState, SettingsSetValueAction } from '../types';
import { assocPath } from 'ramda';
import { createSelector } from 'reselect';

type SettingsAction = SettingsSetValueAction;

export const initialState: SettingsState = {
  unitDisplay: {
    weight: 'kg',
    height: 'cm',
  },
  notifications: {
    memories: true,
    stimulation: true,
    growth: true,
    activities: false,
    email: true,
  },
};

export function setSettingsValue(path: Array<string>, value: any) {
  return {
    type: 'SETTINGS_SET_VALUE',
    payload: {
      path,
      value,
    },
  };
}

export const unitDisplaySelector = (state: State) => state.settings.unitDisplay;

export default function reducer(
  state: SettingsState = initialState,
  action: SettingsAction,
) {
  switch (action.type) {
    case 'SETTINGS_SET_VALUE': {
      return assocPath(action.payload.path, action.payload.value, state);
    }
    default: {
      return state;
    }
  }
}
