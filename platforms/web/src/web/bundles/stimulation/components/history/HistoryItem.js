// @flow
import React from 'react';
import type { ActivityHistoryItemFragment } from 'core/types';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';
import moment from 'moment';
import * as HistoryItemStyled from '../../styled/history/HistoryItemStyled';

type Props = {
  item: ActivityHistoryItemFragment,
  handleClick: Function,
};

const getWeekName = (startDate, endDate) => {
  const period = `${moment(startDate).format('D MMMM')} - ${moment(
    endDate,
  ).format('D MMMM YYYY')}`;
  const dayDiff = moment().diff(moment(startDate), 'days');

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

const HistoryItem = ({ item, handleClick }: Props) => (
  <HistoryItemStyled.Wrapper onClick={handleClick}>
    <HistoryItemStyled.Text>
      {getWeekName(item.startDate, item.endDate)}
    </HistoryItemStyled.Text>
    <ArrowRight />
  </HistoryItemStyled.Wrapper>
);

export default HistoryItem;
