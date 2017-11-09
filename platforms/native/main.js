// @flow
import type { AppStartedAction } from '../../core/types';
import React, { PureComponent } from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist';
import Raven from 'raven-js';
import { createRenderer } from 'fela-native';
import configureStore from '../../core/configureStore';
import configureStorage from '../../core/configureStorage';
import configureReporting from '../../core/configureReporting';
import { configureApollo } from '../../core/configureApollo';
import configureFela from '../../core/configureFela';
import NativeFelaProvider from './components/FelaProvider';
import theme from '../../core/themes/defaultTheme';
import config from '../../core/config';
import Root from './root';
import { epics as appEpics } from './app/actions';
import { epics as navigationEpics } from './navigation/actions';
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
  platformEpics: [...appEpics, ...navigationEpics],
});

persistStore(
  store,
  {
    ...configureStorage(config.appName),
    storage: AsyncStorage,
  },
  () => {
    // $FlowFixMe$
    store.dispatch(({ type: 'APP_STARTED' }: AppStartedAction));
  },
);

const apollo = configureApollo();

const { renderer } = configureFela(createRenderer);
const FelaProvider = NativeFelaProvider(renderer, theme);

class Main extends PureComponent {
  render() {
    return (
      <ApolloProvider client={apollo} store={store}>
        <FelaProvider>
          <Root />
        </FelaProvider>
      </ApolloProvider>
    );
  }
}
export default Main;
