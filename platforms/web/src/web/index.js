// @flow
import type { AppStartedAction } from 'core/types';
import { render } from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist';
import Raven from 'raven-js';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import history from 'web/navigation/history';
import configureStore from 'core/configureStore';
import configureStorage from 'core/configureStorage';
import configureReporting from 'core/configureReporting';
import { configureApollo } from 'core/configureApollo';
import theme from './themes/web';
import config from 'core/config';
import { ThemeProvider } from 'styled-components';
import App from 'web/app';
import registerServiceWorker from './registerServiceWorker';
import { epics as appEpics } from './app/actions';
import baby from 'web/reducers/babyReducer';

const routingMiddlware: Middleware = routerMiddleware((history: History));

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
    navigation: routerReducer,
    baby,
  },
  platformMiddleware: [reportingMiddleware, routingMiddlware],
  platformEpics: [...appEpics],
});

persistStore(
  store,
  {
    ...configureStorage(config.appName),
  },
  () => {
    store.dispatch(({ type: 'APP_STARTED' }: AppStartedAction));
  },
);

const apollo = configureApollo();

// TODO: remove after deps update
// console.ignoredYellowBox = [
//   'Warning: checkPropTypes',
//   'Using <Image> with children',
// ];

const renderApp = Component => {
  render(
    <ApolloProvider client={apollo} store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

renderApp(App);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    renderApp(NextApp);
  });
}
