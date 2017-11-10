// @flow
import {
  curry,
  find,
  last,
  lensPath,
  path,
  pathEq,
  set,
  view,
  without,
} from 'ramda';
import { replaceEdge } from './connection';

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

export const getCurrentUserFromStore = (gql, store) => {
  try {
    return store.readQuery({
      query: gql`
        query CurrentUser {
          viewer {
            user {
              id
              firstName
              lastName
              avatar {
                url
              }
            }
          }
        }
      `,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};
