// @flow
import type { AppStartedAction } from "common/types";
import { render } from "react-dom";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { persistStore } from "redux-persist";
import Raven from "raven-js";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import history from "web/navigation/history";
import configureStore from "common/configureStore";
import configureStorage from "common/configureStorage";
import configureReporting from "common/configureReporting";
import { configureApollo } from "common/configureApollo";
import theme from "common/themes/defaultTheme";
import config from "common/config";
import { ThemeProvider } from "styled-components";
import { containers } from "web/shared";
import registerServiceWorker from "./registerServiceWorker";
import { epics as navigationEpics } from "web/navigation/actions";

const routingMiddlware: Middleware = routerMiddleware((history: History));

const reportingMiddleware = configureReporting({
  sentryUrl: config.sentryUrl,
  appVersion: config.appVersion,
  Raven
});

const store = configureStore({
  initialState: {
    config
  },
  platformReducers: {
    navigation: routerReducer
  },
  platformMiddleware: [reportingMiddleware, routingMiddlware],
  platformEpics: [...navigationEpics]
});

persistStore(
  store,
  {
    ...configureStorage(config.appName)
  },
  () => {
    store.dispatch(({ type: "APP_STARTED" }: AppStartedAction));
  }
);

const apollo = configureApollo();

// TODO: remove after deps update
console.ignoredYellowBox = [
  "Warning: checkPropTypes",
  "Using <Image> with children"
];

const renderApp = Component => {
  render(
    <ApolloProvider client={apollo} store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </ThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
};

renderApp(containers.App);

registerServiceWorker();

if (module.hot) {
  module.hot.accept("./shared/containers/App", () => {
    const NextApp = require("./shared/containers/App").default;
    renderApp(NextApp);
  });
}
