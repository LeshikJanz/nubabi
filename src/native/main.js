import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import * as firebase from 'firebase';
import configureStore from '../common/configureStore';
import NuBabiMobile from './root';
import configureStorage from '../common/configureStorage';
import { Action } from '../common/types';
import navigation from './navigation/reducer';
import device from './device/reducer';

const config = {
  appName: 'Nubabi',
  apiKey: 'AIzaSyD7KJ48lVi0o489Hr0zuoGkNyhZUL9SsSw',
  authDomain: 'nubabitest1.firebaseapp.com',
  databaseURL: 'https://nubabitest1.firebaseio.com',
  storageBucket: 'nubabitest1.appspot.com',
  messagingSenderId: '397278907687',
};

const store = configureStore({
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

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch(({ type: 'ON_AUTH', payload: { user } }: Action));
});

const Main = () => (
  <Provider store={store}>
    <NuBabiMobile />
  </Provider>
);

export default Main;
