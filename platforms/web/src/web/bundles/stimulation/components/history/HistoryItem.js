// @flow
import React from 'react';
import { ActivityHistoryItemFragment } from 'core/types';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';
import moment from 'moment';

const Wrapper = styled(Flex)`
  background-color: #fff;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  box-shadow: ${props => props.theme.shadows.panel};
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }
`;

const HistoryText = styled.div``;

type Props = {
  item: ActivityHistoryItemFragment,
  handleClick: Function,
};

const HistoryItem = ({ item, handleClick }: Props) => (
  <Wrapper onClick={handleClick}>
    <HistoryText>
      {moment(item.startDate).format('DD MMMM')} -{' '}
      {moment(item.endDate).format('DD MMMM YYYY')}
    </HistoryText>
    <ArrowRight />
  </Wrapper>
);

export default HistoryItem;
