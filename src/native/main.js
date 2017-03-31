import React from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import configureStore from '../common/configureStore';
import configureStorage from '../common/configureStorage';
import config from '../common/config';
import NuBabiMobile from './root';

import { Action } from '../common/types';
import navigation from './navigation/reducer';
import device from './device/reducer';

const store = configureStore({
  initialState: {
    config,
  },
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

const Main = () => (
  <Provider store={store}>
    <NuBabiMobile />
  </Provider>
);

export default Main;
