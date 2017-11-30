// @flow
import {
  curry,
  curryN,
  either,
  isEmpty as isEmptyOrig,
  isNil,
  path,
  prop,
  pluck,
} from 'ramda';

export const isEmpty = curryN(0, arg => either(isNil, isEmptyOrig)(arg));

export const isEmptyProp = curry((propName: string, props: Object) => {
  return isEmpty(prop(propName, props));
});

export const isEmptyPath = curry((pathArray: Array<string>, props: Object) => {
  return isEmpty(path(pathArray, props));
});
