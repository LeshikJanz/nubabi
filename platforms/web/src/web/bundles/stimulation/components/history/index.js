// @flow
import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';

const Wrapper = styled.div`
  padding: 15px;
`;

const ListHeader = styled(Flex)`
  margin: 34px 0 15px;
`;

const ListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;

type Props = {
  activityHistory: ActivityHistoryItemFragment,
  handleHistory: Function,
};

const History = ({ activityHistory, handleHistory }: Props) => (
  <Wrapper>
    <ListHeader justify="space-between" align="center">
      <ListTitle>Activity History</ListTitle>
    </ListHeader>

    <div>
      {activityHistory.edges.map(({ node }) => (
        <HistoryItem
          key={node.id}
          item={node}
          handleClick={() => handleHistory(node.id)}
        />
      ))}
    </div>
  </Wrapper>
);

export default History;
