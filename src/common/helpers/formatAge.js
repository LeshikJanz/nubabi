// @flow
import moment from 'moment';
import pluralize from 'pluralize';

const pluralizeAge = (count: number, unit: string) => {
  return [count, pluralize(unit, count), 'old'].join(' ');
};

export const formatAge = (dobString: string) => {
  const now = moment();
  const dob = moment(dobString);

  const diff = now.diff(dob, 'months');
  const shouldDisplayWeeks = diff === 0;

  if (shouldDisplayWeeks) {
    const weeks = now.diff(dob, 'week');
    return pluralizeAge(weeks, 'week');
  }

  const shouldDisplayYears = diff >= 12;

  if (shouldDisplayYears) {
    const years = now.diff(dob, 'years');
    return pluralizeAge(years, 'year');
  }

  return pluralizeAge(diff, 'month');
};
