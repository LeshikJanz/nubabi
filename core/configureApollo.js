// @flow
import type { Action, State } from './types';
import { ApolloClient } from 'apollo-client';
// $FlowFixMe$
import { IntrospectionFragmentMatcher } from 'react-apollo';
import config from './config';
import ServerNetworkInterface from './helpers/serverNetworkInterface';

let client = null; // singleton

const networkInterface = new ServerNetworkInterface(config.graphqlEndpoint);

export const configureApollo = (): ApolloClient => {
  if (!client) {
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

export const configureApolloAuth = (store: Store<Action, State>) => {
  networkInterface.use([authTokenMiddleware(store)]);
};
