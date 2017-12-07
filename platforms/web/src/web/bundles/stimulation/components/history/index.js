// @flow
import React from 'react';
import HistoryItem from './HistoryItem';
import * as HistoryStyled from '../../styled/history/indexStyled';

type Props = {
  activityHistory: ActivityHistoryItemFragment,
  handleHistory: Function,
};

const History = ({ activityHistory, handleHistory }: Props) => (
  <HistoryStyled.Wrapper>
    <HistoryStyled.ListHeader justify="space-between" align="center">
      <HistoryStyled.ListTitle>Activity History</HistoryStyled.ListTitle>
    </HistoryStyled.ListHeader>

    <div>
      {activityHistory.edges.map(({ node }) => (
        <HistoryItem
          key={node.id}
          item={node}
          handleClick={() => handleHistory(node.id)}
        />
      ))}
    </div>
  </HistoryStyled.Wrapper>
);

export default History;
