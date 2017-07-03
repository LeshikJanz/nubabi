// @flow
import { path, pluck, curry } from 'ramda';

function normalizePath(edgesPath: string) {
  const accessor = edgesPath.split('.');
  const accessorPath =
    accessor[accessor.length - 1] === 'edges'
      ? accessor
      : [...accessor, 'edges'];

  return accessorPath;
}

export function mapEdgesToProp(
  edgePath: string,
  propName: string,
  dataObj: any,
) {
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
}

export default curry(mapEdgesToProp);
