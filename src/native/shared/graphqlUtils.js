// @flow
import {
  memoize,
  pluck,
  path,
  prop,
  omit,
  either,
  curryN,
  isNil,
  isEmpty as isEmptyOrig,
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

export const isEmptyProp = (propName: string) => props => {
  return isEmpty(prop(propName, props));
};

export const isEmptyPath = (pathArray: Array<string>) => props => {
  return isEmpty(path(pathArray, props));
};

export const formValues = memoize((obj: mixed) => {
  return omit(['id', '__typename'], obj);
});
