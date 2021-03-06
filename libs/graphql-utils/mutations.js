// @flow
import { curry } from 'ramda';
import { cursorForObjectInConnection } from './connection';

export const addEdgeToMutationResult = (response: any) => {
  // TODO: cursors?
  return {
    edge: {
      node: response,
    },
  };
};

export const addEdgeAndCursorToMutationResult = curry(
  (connectionGetter: () => Promise<*>, obj: mixed) => {
    return connectionGetter().then(connection => {
      return {
        edge: {
          node: obj,
          cursor: cursorForObjectInConnection(connection, obj),
        },
      };
    });
  },
);

export const optimisticResponse = curry(
  (operationName: string, payloadName: string, response, variables) => {
    const result =
      typeof response === 'function' ? response(variables) : response;

    return {
      __typename: 'Mutation',
      [operationName]: {
        __typename: payloadName,
        ...result,
      },
    };
  },
);
