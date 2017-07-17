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

export type GraphQLContext = {
  token: string,
  connectors: {
    firebase: Object,
  },
};

export type { ConnectionArguments } from 'graphql-relay';

export type RawSkillArea = {};

export type RawActivity = {
  skill_area_id: number,
};

export type RawActivityMedia = {};

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

const {
  nodeField,
} = nodeDefinitions((globalId, { token, connectors: { firebase } }) => {
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

export const transform = (propName, transformFn) => obj => {
  const value = prop(propName)(obj);

  return value ? transformFn(value) : null;
};

export const connectionFromPromisedArrayWithCount = (promise, args) => {
  return promise.then(data => {
    const count = R.pathOr(data.length, ['meta', 'total'], data);
    const connection = connectionFromArray(data.data ? data.data : data, args);

    return R.assocPath(['count'], count, connection);
  });
};

export const getPaginationArguments = (args: ConnectionArguments) => {
  const { after, before, first, last } = args;
  const paginationArguments = {};

  if (first && last) {
    throw new Error(
      'Connection arguments first and last cannot be used together',
    );
  }

  if (typeof first === 'number') {
    if (first < 0) {
      throw new Error('Argument "first" must be a non-negative integer');
    }

    paginationArguments.first = first;
  }

  if (typeof last === 'number') {
    if (last < 0) {
      throw new Error('Argument "last" must be a non-negative integer');
    }

    paginationArguments.last = last;
  }

  if (typeof after !== 'undefined') {
    paginationArguments.after = after;
  }

  if (typeof before !== 'undefined') {
    paginationArguments.before = before;
  }

  return paginationArguments;
};

export const connectionFromBackendMetadataArray = data => {
  const { data: payload, meta } = data;

  const edges = payload.map(node => ({
    node: R.omit('cursor', node),
    cursor: node.cursor,
  }));

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];

  const connection = {
    edges,
    count: meta.total,
    pageInfo: {
      startCursor: firstEdge.cursor, // TODO: backend meta should do this
      endCursor: lastEdge.cursor, // TODO: above
      pageSize: meta.pageSize,
      hasNextPage: meta.hasNextPage,
      hasPrevPage: meta.hasPrevPage,
    },
  };

  return connection;
};

export const connectionFromBackendMetadata = (promise, args) => {
  return promise.then(data => connectionFromBackendMetadataArray(data, args));
};

export const toDate = R.constructN(1, Date);
export const sortByTimestamp = R.sortBy(R.prop('createdAt'));

export {
  fromGlobalId,
  globalIdField,
  toGlobalId,
  connectionFromPromisedArray,
  connectionFromArray,
};
