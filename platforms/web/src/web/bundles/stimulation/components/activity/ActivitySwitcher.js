// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import ArrowLeft from 'web/assets/images/icons/arrow-left-icon.svg';
import { Baby, ActivityConnection } from 'core/types';
import { withRouter } from 'react-router-dom';

const SwitcherWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);

  .separator {
    height: 60px;
  }
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

const Separator = styled.div`
  width: 2px;
  height: 60px;
  background-color: #e9ecf4;
`;

const PreviousElement = styled(Flex)`
  align-items: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  > svg {
    margin: 0 15px;
  }
`;

const NextElement = styled(Flex)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  justify-content: flex-end;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  > svg {
    margin: 0 15px;
    transform: rotate(180deg);
  }
`;

type Props = {
  baby: Baby,
  activity: ActivityConnection,
  history: any,
};

const ActivitySwitcher = ({ baby, activity, history }: Props) => {
  const curActivityIndex = baby.activities.edges.findIndex(
    ({ node }) => node.id === activity.id,
  );
  const prevActivity = (baby.activities.edges[curActivityIndex - 1] &&
    baby.activities.edges[curActivityIndex - 1].node) || {
    id: '',
    name: 'Return to list',
  };
  const nextActivity = (baby.activities.edges[curActivityIndex + 1] &&
    baby.activities.edges[curActivityIndex + 1].node) || {
    id: '',
    name: 'Return to list',
  };

  const handleRedirect = (id: string) => {
    history.push(`/stimulation/activity/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <SwitcherWrapper>
      <PreviousElement onClick={() => handleRedirect(prevActivity.id)}>
        <ArrowLeft />
        <SwitchText>
          <div>Back</div>
          <div>{prevActivity.name}</div>
        </SwitchText>
      </PreviousElement>
      <Separator />
      <NextElement onClick={() => handleRedirect(nextActivity.id)}>
        <SwitchText>
          <div>Next</div>
          <div>{nextActivity.name}</div>
        </SwitchText>
        <ArrowLeft />
      </NextElement>
    </SwitcherWrapper>
  );
};

export default withRouter(ActivitySwitcher);
