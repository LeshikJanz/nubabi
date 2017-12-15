// @flow
import { combineReducers } from 'redux';
import type { Action, State } from './types';
import { reducer as form } from 'redux-form';
import app from './app/reducer';
import config from './config/reducer';
import auth from './auth/reducer';
import device from './device/reducer';
import viewer from './viewer/reducer';
import babies from './babies/reducer';
import growth from './growth/reducer';
import settings from './settings/reducer';
import ui from './ui/reducer';
import { configureApollo } from './configureApollo';

// stackoverflow.com/q/35622588/233902
/* eslint-disable no-unused-vars */
export const resetStateOnSignOutReducer = (reducer, initialState) => {
  /* eslint-enable no-unused-vars */
  return (state: State, action: Action) => {
    // TODO: this is too attached to Firebase
    const userWasSignedOut =
      action.type === 'ON_AUTH' && state.viewer && !action.payload.user;

    if (!userWasSignedOut) {
      return reducer(state, action);
    }
    // Note how we can purge sensitive data without hard reload easily.

    const stateWithoutSensitiveData = {
      app: state.app,
      device: state.device,
      navigation: state.navigation,
      config: initialState.config,
    };

    return reducer(stateWithoutSensitiveData, action);
  };
};

/* eslint-disable no-unused-vars */
const configureReducer = (platformReducers: Object, initialState: Object) => {
  /* eslint-enable no-unused-vars */

  const apollo = configureApollo().reducer();

  // $FlowFixMe
  let reducer = combineReducers({
    app,
    apollo,
    auth,
    config,
    babies,
    growth,
    device,
    form,
    settings,
    ui,
    viewer,
    ...platformReducers,
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  // TODO: restore initialState if used via either native storage or server
  // pre-rendering in the future
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
