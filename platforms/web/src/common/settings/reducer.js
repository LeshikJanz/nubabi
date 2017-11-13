// @flow
import type { SettingsSetValueAction, SettingsState, State } from "../types";
import assocPath from "ramda/src/assocPath";
import merge from "ramda/src/merge";

type SettingsAction = SettingsSetValueAction;

export const initialState: SettingsState = {
  unitDisplay: {
    weight: "kg",
    height: "cm"
  },
  notifications: {
    memories: true,
    stimulation: true,
    growth: true,
    activities: false,
    email: true
  },
  memories: {
    displaySuggestions: true
  }
};

export function setSettingsValue(path: Array<string>, value: any) {
  return {
    type: "SETTINGS_SET_VALUE",
    payload: {
      path,
      value
    }
  };
}

export const resetSettings = () => ({
  type: "RESET_SETTINGS"
});

export const resetTips = () => ({
  type: "RESET_TIPS"
});

export const unitDisplaySelector = (state: State) => state.settings.unitDisplay;

export default function reducer(
  state: SettingsState = initialState,
  action: SettingsAction
) {
  switch (action.type) {
    case "SETTINGS_SET_VALUE": {
      return assocPath(action.payload.path, action.payload.value, state);
    }
    case "RESET_SETTINGS": {
      return initialState;
    }
    case "RESET_TIPS": {
      return merge(state, {
        memories: {
          displaySuggestions: true
        }
      });
    }
    default: {
      return state;
    }
  }
}