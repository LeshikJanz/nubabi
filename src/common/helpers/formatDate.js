// @flow
import moment from 'moment';

export const formatDate = (date: Date | string | number) => {
  const now = moment(date);
  return now.format('MMMM D YYYY').toUpperCase();
};

export default formatDate;
