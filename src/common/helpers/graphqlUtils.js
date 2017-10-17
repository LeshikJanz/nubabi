// @flow
import {
  always,
  compose,
  cond,
  curry,
  curryN,
  either,
  find,
  findIndex,
  isEmpty as isEmptyOrig,
  isNil,
  last,
  lensIndex,
  lensPath,
  memoize,
  omit,
  path,
  pathEq,
  pluck,
  prop,
  propEq,
  set,
  startsWith,
  T,
  view,
  without,
} from 'ramda';
import {
  cursorForObjectInConnection as cursorForObjectInConnectionOrig,
  offsetToCursor,
} from 'graphql-relay';
import { connect } from 'react-redux';
import { toggleNetworkActivityIndicator } from '../ui/reducer';

export const flattenEdges = memoize(connection => {
  if (!connection) {
    return [];
  }

  const edges = prop('edges', connection);

  if (!edges || !edges.length) {
    return [];
  }

  return pluck('node', edges).map(node => {
    Object.keys(node).forEach(key => {
      if (path([key, 'edges'], node)) {
        node[key] = flattenEdges(prop(key, node)); // eslint-disable no-param-reassign
      }
    });

    return omit('edges', node);
  });
});

export const isEmpty = curryN(0, arg => either(isNil, isEmptyOrig)(arg));

export const isEmptyProp = curry((propName: string, props: Object) => {
  return isEmpty(prop(propName, props));
});

export const isEmptyPath = curry((pathArray: Array<string>, props: Object) => {
  return isEmpty(path(pathArray, props));
});

export const formValues = memoize((obj: mixed) => {
  return omit(['id', '__typename'], obj);
});

function normalizePath(edgesPath: string) {
  const accessor = edgesPath.split('.');
  const accessorPath =
    accessor[accessor.length - 1] === 'edges'
      ? accessor
      : [...accessor, 'edges'];

  return accessorPath;
}

export const mapEdgesToProp = curry(
  (edgePath: string, propName: string, dataObj: any) => {
    // TODO: better check if we're passing a destructured data or not
    const data = dataObj.data ? dataObj.data : dataObj;

    const edges = path(normalizePath(edgePath), data);

    let prop;

    if (edges) {
      prop = pluck('node', edges);
    }

    return {
      data,
      [propName]: prop,
    };
  },
);

export const addEdge = (
  query: DocumentNode,
  operationName: string,
  edgePath: Array<string>,
  addTo: string = 'tail',
) => (store: DataProxy, { data: payload }: Object) => {
  if (payload[operationName]) {
    const data = store.readQuery({ query });
    const edges = path(edgePath, data);

    const addWith = addTo === 'head' ? 'unshift' : 'push';

    edges[addWith](payload[operationName].edge);
    store.writeQuery({ query, data });
  }
};

export const addEdgeToFragment = (
  fragment: DocumentNode,
  operationName: string,
  edgePath: Array<string>,
  rootId: string,
  addTo: string = 'tail',
  fragmentOptions?:
    | DataProxyReadFragmentOptions
    | DataProxyWriteFragmentOptions = {},
) => (store: DataProxy, { data: payload }: Object) => {
  if (!path([operationName, 'edge'], payload)) {
    return;
  }

  const id = rootId;
  const data = store.readFragment({ fragment, id, ...fragmentOptions });

  if (last(edgePath) !== 'edges') {
    edgePath.push('edges');
  }
  const edges = path(edgePath, data);

  if (!edges) {
    return;
  }

  const addWith = addTo === 'head' ? 'unshift' : 'push';
  edges[addWith](payload[operationName].edge);

  store.writeFragment({ fragment, ...fragmentOptions, id, data });
};

export const removeEdgeFromFragment = (
  fragment: DocumentNode,
  edgeId: string,
  rootId: string,
  edgePath: Array<string>,
  fragmentOptions?:
    | DataProxyReadFragmentOptions
    | DataProxyWriteFragmentOptions = {},
) => (store: DataProxy, { data: payload }) => {
  const data = store.readFragment({ fragment, id: rootId, ...fragmentOptions });

  if (last(edgePath) !== 'edges') {
    edgePath.push('edges');
  }

  const edgesPath = lensPath(edgePath);
  const edges = view(edgesPath, data);

  // By convention we use the first key to fetch the payload
  // maybe we can use this on addEdges... above
  const operationName = Object.keys(payload)[0];

  if (!payload[operationName]) {
    // The operation didn't complete successfully so we return early.
    return;
  }

  const edge = find(pathEq(['node', 'id'], edgeId), edges);

  const newEdges = set(edgesPath, without([edge], edges), data);

  store.writeFragment({
    fragment,
    ...fragmentOptions,
    id: rootId,
    data: newEdges,
  });
};

const findEdgeIndex = (id, edges) => {
  return findIndex(pathEq(['node', 'id'], id), edges);
};

export const replaceEdge = (
  data: any,
  edgePath: Array<string>,
  edge: Object,
) => {
  const edgesPath = lensPath(edgePath);
  const oldEdges = view(edgesPath, data);
  const edgeIndex = findEdgeIndex(edge.node.id, oldEdges);
  const indexLens = lensIndex(edgeIndex);

  if (edgeIndex !== -1) {
    const newEdges = set(indexLens, edge, oldEdges);
    return set(edgesPath, newEdges, data);
  }

  return null;
};

const updateFragment = curry(
  (
    updaterFn: Function,
    fragment: DocumentNode,
    rootId: string,
    fragmentOptions?:
      | DataProxyReadFragmentOptions
      | DataProxyWriteFragmentOptions = {},
  ) => (store, data) => {
    const oldData = store.readFragment({
      fragment,
      id: rootId,
      ...fragmentOptions,
    });
    console.log(oldData);
    const newData = updaterFn(oldData);
    console.log(newData);
    if (newData) {
      store.writeFragment({
        fragment,
        id: rootId,
        ...fragmentOptions,
        data: newData,
      });
    }
  },
);

export const replaceEdgeInFragment = (
  edge: mixed,
  fragment: DocumentNode,
  rootId: string,
  edgePath: Array<string>,
  fragmentOptions?:
    | DataProxyReadFragmentOptions
    | DataProxyWriteFragmentOptions = {},
) => {
  return updateFragment(fragmentData =>
    replaceEdge(fragmentData, edgePath, edge),
  );
};

export const addEdgeToMutationResult = (response: any) => {
  // TODO: cursors?
  return {
    edge: {
      node: response,
    },
  };
};

export const cursorForObjectInConnection = (
  connection: Array<mixed>,
  obj: mixed,
) => {
  const cursor = cursorForObjectInConnectionOrig(connection, obj);

  // try to find by ID if the original fails
  if (!cursor && obj.id) {
    const objInConnectionById = find(propEq('id', obj.id))(connection);
    if (objInConnectionById) {
      return offsetToCursor(connection.indexOf(objInConnectionById));
    }
  }

  return cursor;
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

export const keyExtractor = prop('id');

export const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str,
  );

export const withNetworkIndicator = curry(
  (
    networkIndicatorToggler: typeof toggleNetworkActivityIndicator,
    operation: () => Promise<*>,
  ) => () => {
    networkIndicatorToggler(true);
    return operation().finally(() => networkIndicatorToggler(false));
  },
);

export const withNetworkIndicatorActions = connect(null, {
  toggleNetworkActivityIndicator,
});

export const getTypenameForFile = (file: { contentType: string }) => {
  return compose(
    cond([
      [startsWith('image'), always('Image')],
      [startsWith('video'), always('Video')],
      [startsWith('audio'), always('Audio')],
      [T, always('GenericFile')],
    ]),
    prop('contentType'),
  )(file);
};

export const optimisticResponse = (
  operationName: string,
  payloadName: string,
  response,
  variables,
) => {
  return {
    __typename: 'Mutation',
    [operationName]: {
      __typename: payloadName,
      ...response,
    },
  };
};
