// @flow
import React from 'react';
import { ArrowRight } from 'web/assets/images';
import * as HistoryItemStyled from '../../styled/history/HistoryItemStyled';

type Props = {
  weekName: string,
  handleClick: Function,
};

const HistoryItem = ({ weekName, handleClick }: Props) => (
  <HistoryItemStyled.Wrapper onClick={handleClick}>
    <HistoryItemStyled.Text>{weekName}</HistoryItemStyled.Text>
    <ArrowRight />
  </HistoryItemStyled.Wrapper>
);

export default HistoryItem;
