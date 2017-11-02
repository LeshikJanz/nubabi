// @flow
import __ from "ramda/src/__";
import cond from "ramda/src/cond";
import curryN from "ramda/src/curryN";
import equals from "ramda/src/equals";
import gte from "ramda/src/gte";
import memoize from "ramda/src/memoize";
import T from "ramda/src/T";
import pluralize from "pluralize";
import differenceInWeeks from "date-fns/difference_in_weeks";
import differenceInYears from "date-fns/difference_in_years";
import differenceInMonths from "date-fns/difference_in_months";
import parse from "date-fns/parse";

const pluralizeAge = memoize((count: number, unit: string) => {
  return [count, pluralize(unit, count), "old"].join(" ");
});

const shouldDisplayWeeks = equals(0);
const shouldDisplayYears = gte(__, 12);

export const formatAge = (dobString: string) => {
  const now = new Date.now();
  const dob = parse(dobString);

  const pluralizedYears = () =>
    pluralizeAge(differenceInYears(now, dob), "year");

  const pluralizedWeeks = () =>
    pluralizeAge(differenceInWeeks(now, dob), "week");

  const pluralizedMonths = () =>
    pluralizeAge(differenceInMonths(now, dob), "month");

  return cond([
    [shouldDisplayWeeks, () => pluralizedWeeks()],
    [shouldDisplayYears, () => pluralizedYears()],
    [T, () => pluralizedMonths()]
  ])(differenceInMonths(now, dob));
};
