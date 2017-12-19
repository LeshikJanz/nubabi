// @flow
import { compose, withProps, withHandlers } from 'recompose';
import moment from 'moment';
import HistoryItem from '../../components/history/HistoryItem';

export default compose(
  withHandlers({
    getWeekName: ({ item }) => () => {
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
    },
  }),
  withProps(({ getWeekName }) => ({
    weekName: getWeekName(),
  })),
)(HistoryItem);
