// @flow
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import type { Middleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { ThemeProvider } from "styled-components";
import { containers } from "web/shared";
import theme from "./constants/theme";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "common/configureStore";
import type { Options } from "web/types";
import * as firebase from "firebase";

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

const renderApp = Component => {
  render(<Component />, document.getElementById("root"));
};

renderApp(containers.App);

registerServiceWorker();

// if (process.env.NODE_ENV !== "production") {
//   const { whyDidYouUpdate } = require("why-did-you-update");
//   /*eslint-disable */
//   let createClass = React.createClass;
//   /*eslint-enable */
//   Object.defineProperty(React, "createClass", {
//     set: nextCreateClass => {
//       createClass = nextCreateClass;
//     }
//   });
//   whyDidYouUpdate(React);
// }

if (module.hot) {
  module.hot.accept("./shared/containers/App", () => {
    const NextApp = require("./shared/containers/App").default;
    renderApp(NextApp);
  });
}
