// @flow
import {
  assoc,
  curryN,
  either,
  isEmpty as isEmptyOrig,
  isNil,
  memoize,
  omit,
  path,
  pluck,
  prop,
  last,
} from 'ramda';

export { default as mapEdgesToProp } from './mapEdgesToProp';

export const flattenEdges = memoize(connection => {
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

export const isEmptyProp = (propName: string) => (props: Object) => {
  return isEmpty(prop(propName, props));
};

export const isEmptyPath = (pathArray: Array<string>) => (props: Object) => {
  return isEmpty(path(pathArray, props));
};

export const formValues = memoize((obj: mixed) => {
  return omit(['id', '__typename'], obj);
});

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
  fragmentOptions = {},
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

export const addEdgeToMutationResult = (response: any) => {
  // TODO: cursors?
  return {
    edge: {
      node: response,
    },
  };
};

export const keyExtractor = prop('id');
