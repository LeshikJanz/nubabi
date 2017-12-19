// @flow
import { compose, withProps } from 'recompose';
import moment from 'moment';
import HistoryItem from '../../components/history/HistoryItem';

const getWeekName = item => {
  const period = `${moment(item.startDate).format('D MMMM')} - ${moment(
    item.endDate,
  ).format('D MMMM YYYY')}`;
  const dayDiff = moment().diff(moment(item.startDate), 'days');

  if (dayDiff >= 0) {
    return 'Current week';
  }

  if (dayDiff > 7) {
    return 'Last week';
  }

  if (dayDiff > 14) {
    return 'Two weeks ago';
  }

  return period;
};

export default compose(
  withProps(({ item }) => ({
    weekName: getWeekName(item),
  })),
)(HistoryItem);
