import { ApolloClient } from 'apollo-client';
import ClientNetworkInterface from '../server/graphql/helpers/clientNetworkInterface';
import * as firebase from 'firebase';

let client = null; // singleton

const networkInterface = new ClientNetworkInterface({ firebase });

export const configureApollo = () => {
  if (!client) {
    client = new ApolloClient({
      networkInterface,
      dataIdFromObject: obj => obj.id,
    });
  }

  return client;
};

export const configureApolloAuth = store => {
  /* eslint-disable no-param-reassign */
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }

        const token = store.getState().auth.token;
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
      },
    },
  ]);
  /* eslint-enable no-param-reassign */
};
