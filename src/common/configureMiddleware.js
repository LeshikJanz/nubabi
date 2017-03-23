// @flow
import createLoggerMiddleware from 'redux-logger';
import isClient from './app/isClient';
import configureDeps from './configureDeps';
import { sagaMiddleware } from './configureAsyncActions';

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

  const middleware = [
    injectMiddleware(deps),
    sagaMiddleware,
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

  if (module.hot && typeof module.hot.accept === 'function') {
    // TODO: hot reload sagas
  }

  return middleware;
};

export default configureMiddleware;
