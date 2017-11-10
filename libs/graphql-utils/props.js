// @flow
import { curry, memoize, omit, path, pluck, prop } from 'ramda';

export const keyExtractor = prop('id');

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

function normalizePath(edgesPath: string) {
  const accessor = edgesPath.split('.');
  const accessorPath =
    accessor[accessor.length - 1] === 'edges'
      ? accessor
      : [...accessor, 'edges'];

  return accessorPath;
}
