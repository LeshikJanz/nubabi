// @flow
import type { Action, State } from './types';
import { ApolloClient } from 'apollo-client';
// $FlowFixMe$
import { IntrospectionFragmentMatcher } from 'react-apollo';
import config from './config';
import ServerNetworkInterface from './helpers/serverNetworkInterface';

// Singletons
let client = null;
let networkInterface;

export const configureApollo = (firebase?: mixed): ApolloClient => {
  if (!client && !firebase && typeof jest === 'undefined') {
    throw new Error(
      'You called configureApollo without a Firebase parameter before initialized.',
    );
  }

  if (!client) {
    networkInterface = new ServerNetworkInterface(
      config.graphqlEndpoint,
      firebase,
    );

    client = new ApolloClient({
      networkInterface,
      dataIdFromObject: obj => obj.id,
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: require('../graphql.schema.json').data,
      }),
    });
  }

  return client;
};

export const authTokenMiddleware = store => ({
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const { token } = store.getState().auth;
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  },
});

export const contextMiddleware = {
  applyMiddleware(req, next) {
    if (req.request.variables && req.request.variables.context) {
      req.options.context = req.request.variables.context;
      delete req.request.variables.context;
    }
    next();
  },
};

export const configureApolloAuth = (store: Store<Action, State>) => {
  networkInterface.use([authTokenMiddleware(store), contextMiddleware]);
};
