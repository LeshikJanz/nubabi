// @flow
import createLoggerMiddleware from 'redux-logger';
import isClient from './app/isClient';
import configureDeps from './configureDeps';
import configureEpics from './configureEpics';
import { createEpicMiddleware } from 'redux-observable';
import isReactNative from './app/isReactNative';

// Like redux-thunk, but with just one argument for dependencies.
const injectMiddleware = deps =>
  ({ dispatch, getState }: any) =>
    (next: any) =>
      (action: any) =>
        next(
          typeof action === 'function'
            ? action({ ...deps, dispatch, getState })
            : action,
        );

const configureMiddleware = (
  initialState: any,
  platformDeps: any,
  platformMiddleware: any,
) => {
  const deps = configureDeps(initialState, platformDeps);
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middleware = [
    injectMiddleware(deps),
    epicMiddleware,
    ...platformMiddleware,
  ];

  const enableLogger = process.env.NODE_ENV !== 'production' && isClient;

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const logger = createLoggerMiddleware({
      collapsed: true,
    });
    middleware.push(logger);
  }
  /* eslint-disable no-shadow */
  if (module.hot && typeof module.hot.accept === 'function') {
    if (isReactNative) {
      module.hot.accept(() => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    } else {
      module.hot.accept('./configureEpics', () => {
        const configureEpics = require('./configureEpics').default;

        epicMiddleware.replaceEpic(configureEpics(deps));
      });
    }
  }
  /* eslint-enable no-shadow */

  return middleware;
};

export default configureMiddleware;
