// @flow
import type { AppStartedAction } from "../common/types";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { persistStore } from "redux-persist";
import Raven from "raven-js";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "common/configureStore";
import configureStorage from "common/configureStorage";
import configureReporting from "common/configureReporting";
import { configureApollo } from "common/configureApollo";
import theme from "common/themes/defaultTheme";
import config from "common/config";
import Root from "web/root";
import { ThemeProvider } from "styled-components";

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

const history: History = createHistory();

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
    router: routerReducer
  },
  platformMiddleware: [reportingMiddleware, { history: History }]
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

class Main extends Component {
  render() {
    return (
      <ApolloProvider client={apollo} store={store}>
        <ThemeProvider them={theme}>
          <Root />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
export default Main;
