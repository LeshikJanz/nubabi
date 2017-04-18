/* eslint-disable arrow-parens */
import R from 'ramda';
import {
  connectionFromPromisedArray,
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';
import firebase from '../connectors/firebaseConnector';

export const mutationWithClientMutationId = (mutateAndGetPayload) => {
  return (_, { input }, ctx, info) => {
    return Promise.resolve(mutateAndGetPayload(input, ctx, info))
      .then((payload) => {
        payload.clientMutationId = input.clientMutationId; // eslint-disable-line no-param-reassign
        return payload;
      });
  };
};

const { nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Baby': {
        return firebase.getBaby(id);
      }
      default: {
        return null;
      }
    }
  },
);

export const nodeFieldResolver = nodeField.resolve;

export const prop = (propName) => R.curry((obj) => {
  return R.propOr(null, propName, obj);
});

export const transform = (propName, transformFn) => (obj) => {
  const value = prop(propName)(obj);

  return value ? transformFn(value) : null;
};

export {
  fromGlobalId,
  globalIdField,
  toGlobalId,
  connectionFromPromisedArray,
};
