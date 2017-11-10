// @flow
import { memoize, omit } from 'ramda';

export const formValues = memoize((obj: mixed) => {
  return omit(['id', '__typename'], obj);
});
