import React from 'react';
import { Provider } from 'react-redux';
import NuBabiMobile from './index';
import configureStore from './store/configureStore';
import * as firebase from 'firebase';

const store = configureStore();

const config = {
  apiKey: 'AIzaSyD7KJ48lVi0o489Hr0zuoGkNyhZUL9SsSw',
  authDomain: 'nubabitest1.firebaseapp.com',
  databaseURL: 'https://nubabitest1.firebaseio.com',
  storageBucket: 'nubabitest1.appspot.com',
  messagingSenderId: '397278907687',
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // load from cache
  } else {
    console.log('logged out');
  }
});

const Main = () => (
  <Provider store={store}>
    <NuBabiMobile />
  </Provider>
);

module.exports = Main;
