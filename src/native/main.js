import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';
import Raven from 'raven-js';
import configureStore from '../common/configureStore';
import configureStorage from '../common/configureStorage';
import configureReporting from '../common/configureReporting';
import { configureApollo } from '../common/configureApollo';
import config from '../common/config';
import Root from './root';

import { Action } from '../common/types';
import navigation from './navigation/reducer';
import device from './device/reducer';

Raven.addPlugin(require('raven-js/plugins/react-native'));

const reportingMiddleware = configureReporting({
  sentryUrl: config.sentryUrl,
  appVersion: config.appVersion,
  Raven,
});

const store = configureStore({
  initialState: {
    config,
  },
  platformReducers: {
    navigation,
    device,
  },
  platformMiddleware: [reportingMiddleware],
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

const apollo = configureApollo();

const Main = () => (
  <ApolloProvider client={apollo} store={store}>
    <Root />
  </ApolloProvider>
);

export default Main;
