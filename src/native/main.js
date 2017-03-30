import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import * as firebase from 'firebase';
import configureStore from '../common/configureStore';
import config from '../common/config';
import NuBabiMobile from './root';
import configureStorage from '../common/configureStorage';
import { Action } from '../common/types';
import navigation from './navigation/reducer';
import device from './device/reducer';

const store = configureStore({
  initialState: {
    config,
  },
  platformDeps: { firebase },
  platformReducers: {
    navigation,
    device,
  },
});

persistStore(
  store,
  {
    ...configureStorage(config.appName),
    storage: AsyncStorage,
  },
  () => {
    store.dispatch(({ type: 'APP_STARTED' }: Action));
  },
);

firebase.initializeApp(config.firebase);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch(({ type: 'ON_AUTH', payload: { user } }: Action));
});

const Main = () => (
  <Provider store={store}>
    <NuBabiMobile />
  </Provider>
);

export default Main;
