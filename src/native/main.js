// @flow
import type { Action } from '../common/types';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist';
import Raven from 'raven-js';
import { createRenderer } from 'fela-native';
import configureStore from '../common/configureStore';
import configureStorage from '../common/configureStorage';
import configureReporting from '../common/configureReporting';
import { configureApollo } from '../common/configureApollo';
import configureFela from '../common/configureFela';
import NativeFelaProvider from './components/FelaProvider';
import theme from '../common/themes/defaultTheme';
import config from '../common/config';
import Root from './root';
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

const { renderer } = configureFela(createRenderer);
const FelaProvider = NativeFelaProvider(renderer, theme);

const Main = () => (
  <ApolloProvider client={apollo} store={store}>
    <FelaProvider>
      <Root />
    </FelaProvider>
  </ApolloProvider>
);

export default Main;
