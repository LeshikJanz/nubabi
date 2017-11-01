// @flow
import pluralize from 'pluralize';

export default function pluralizeWithSubject(subject: string, count: number) {
  return `${count} ${pluralize(subject, count)}`;
}
