// @flow
import { __, cond, curryN, equals, gte, memoize, T } from 'ramda';
import moment from 'moment';
import pluralize from 'pluralize';

const pluralizeAge = memoize((count: number, unit: string) => {
  return [count, pluralize(unit, count), 'old'].join(' ');
});

const shouldDisplayWeeks = equals(0);
const shouldDisplayYears = gte(__, 12);

export const formatAge = (dobString: string) => {
  const now = moment();
  const dob = moment(dobString);

  const pluralized = curryN(2, unit =>
    pluralizeAge(now.diff(dob, `${unit}s`), unit),
  );

  return cond([
    [shouldDisplayWeeks, pluralized('week')],
    [shouldDisplayYears, pluralized('year')],
    [T, pluralized('month')],
  ])(now.diff(dob, 'months'));
};
