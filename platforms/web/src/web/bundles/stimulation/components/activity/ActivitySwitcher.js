// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import ArrowLeft from 'web/assets/images/icons/arrow-left-icon.svg';
import { Baby, ActivityConnection } from 'core/types';

const SwitcherWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  height: 60px;
  background-color: #fff;
`;

const SwitchText = styled(Flex)`
  flex-direction: column;

  > div:first-child {
    font-size: 14px;
    color: ${props => props.theme.colors.open.gray2};
  }

  > div:last-child {
    font-size: 14px;
    color: ${props => props.theme.colors.open.gray45};
  }
`;

const PreviousElement = styled(Flex)`
  align-items: center;

  > svg {
    margin: 0 15px;
  }
`;

const NextElement = styled(Flex)`
  align-items: center;

  > svg {
    margin: 0 15px;
    transform: rotate(180deg);
  }
`;

type Props = {
  baby: Baby,
  activity: ActivityConnection,
};

const ActivitySwitcher = ({ baby, activity }: Props) => {
  const curActivityIndex = baby.activities.edges.findIndex(
    ({ node }) => node.id === activity.id,
  );
  const prevActivity = baby.activities.edges[curActivityIndex - 1].node || {
    id: '',
    name: 'Return to list',
  };
  const nextActivity = baby.activities.edges[curActivityIndex + 1].node || {
    id: '',
    name: 'Return to list',
  };

  console.log('prevActivity');
  console.log(prevActivity);
  console.log('nextActivity');
  console.log(nextActivity);

  return (
    <SwitcherWrapper>
      <PreviousElement>
        <ArrowLeft />
        <SwitchText>
          <div>Back</div>
          <div>{prevActivity.name}</div>
        </SwitchText>
      </PreviousElement>
      <NextElement>
        <SwitchText>
          <div>Next</div>
          <div>{nextActivity.name}</div>
        </SwitchText>
        <ArrowLeft />
      </NextElement>
    </SwitcherWrapper>
  );
};

export default ActivitySwitcher;
