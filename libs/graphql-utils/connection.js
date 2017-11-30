// @flow
import {
  find,
  findIndex,
  lensIndex,
  lensPath,
  pathEq,
  propEq,
  set,
  view,
} from 'ramda';
import {
  cursorForObjectInConnection as cursorForObjectInConnectionOrig,
  offsetToCursor,
} from 'graphql-relay';

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
