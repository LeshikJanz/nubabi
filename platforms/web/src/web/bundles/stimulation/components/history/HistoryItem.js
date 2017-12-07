// @flow
import React from 'react';
import { ActivityHistoryItemFragment } from 'core/types';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';
import moment from 'moment';
import * as HistoryItemStyled from '../../styled/history/HistoryItemStyled';

type Props = {
  item: ActivityHistoryItemFragment,
  handleClick: Function,
};

const HistoryItem = ({ item, handleClick }: Props) => (
  <HistoryItemStyled.Wrapper onClick={handleClick}>
    <HistoryItemStyled.Text>
      {moment(item.startDate).format('DD MMMM')} -{' '}
      {moment(item.endDate).format('DD MMMM YYYY')}
    </HistoryItemStyled.Text>
    <ArrowRight />
  </HistoryItemStyled.Wrapper>
);

export default HistoryItem;
