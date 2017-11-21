// @flow
import type { Action, State } from './types';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
// $FlowFixMe$
import { IntrospectionFragmentMatcher } from 'react-apollo';
import * as firebase from 'firebase';
import config from './config';

let client = null; // singleton
let networkInterface;

if (config.graphqlEndpoint && config.graphqlEndpoint !== 'memory://') {
  networkInterface = createNetworkInterface({
    uri: config.graphqlEndpoint,
  });
} else {
  const MemoryNetworkInterface = require('../server/graphql/helpers/clientNetworkInterface')
    .default;

  networkInterface = new MemoryNetworkInterface({ firebase });
}

export const configureApollo = (): ApolloClient => {
  if (!client) {
    client = new ApolloClient({
      networkInterface,
      dataIdFromObject: obj => obj.id,
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: require('../server/graphql/introspection.json')
          .data,
      }),
    });
  }

  return client;
};

export const configureApolloAuth = (store: Store<Action, State>) => {
  /* eslint-disable no-param-reassign */
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        const { token } = store.getState().auth;
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    },
  ]);
  /* eslint-enable no-param-reassign */
};
