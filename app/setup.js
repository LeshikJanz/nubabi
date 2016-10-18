import React from 'react';
import { Provider } from 'react-redux';
import NuBabiMobile from './index';
import configureStore from './store/configureStore';

const store = configureStore();

const Main = () => (
  <Provider store={store}>
    <NuBabiMobile />
  </Provider>
);

module.exports = Main;
