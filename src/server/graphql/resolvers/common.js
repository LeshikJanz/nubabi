/* eslint-disable arrow-parens */
import R from 'ramda';
import {
  connectionFromPromisedArray,
  connectionFromArray,
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';
import * as babies from '../connectors/babiesConnector';

export const mutationWithClientMutationId = mutateAndGetPayload => {
  return (_, { input }, ctx, info) => {
    return Promise.resolve(
      mutateAndGetPayload(input, ctx, info),
    ).then(payload => {
      payload.clientMutationId = input.clientMutationId; // eslint-disable-line no-param-reassign
      return payload;
    });
  };
};

const { nodeField } = nodeDefinitions((globalId, {
  token,
  connectors: { firebase },
}) => {
  const { type, id } = fromGlobalId(globalId);
  switch (type) {
    case 'Baby': {
      return firebase.getBaby(id);
    }
    case 'Activity': {
      return babies.getActivity(token, id);
    }
    default: {
      return null;
    }
  }
});

export const nodeFieldResolver = nodeField.resolve;

export const prop = propName =>
  R.curry(obj => {
    return R.propOr(null, propName, obj);
  });

export const transform = (propName, transformFn) =>
  obj => {
    const value = prop(propName)(obj);

    return value ? transformFn(value) : null;
  };

export const connectionFromPromisedArrayWithCount = (promise, args) => {
  return promise.then(data => {
    const count = data.length;
    const connection = connectionFromArray(data, args);
    return R.assocPath(['count'], count, connection);
  });
};

export {
  fromGlobalId,
  globalIdField,
  toGlobalId,
  connectionFromPromisedArray,
  connectionFromArray,
};
