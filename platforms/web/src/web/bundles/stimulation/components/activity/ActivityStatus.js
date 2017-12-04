// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import GrossIcon from 'web/assets/images/icons/gross-icon.svg';
import { compose, withState } from 'recompose';
import ActivityMenu from './ActivityMenu';
import { ActivityConnection, AdjustActivityLevelInput } from 'core/types';
import { StimulationButtonType } from 'web/types/custom';
import { path } from 'ramda';

const IconWrapper = styled.div`
  position: absolute;
  width: 90px;
  height: 100px;
  left: 50%;
  top: 20px;
  transform: translate(-50%, -50%);
  border: 8px solid rgb(234, 238, 248);
  border-radius: 100%;
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  margin-top: 30px;
  padding-bottom: 30px;
  background-color: #eaeef8;

  > svg {
    width: 69px;
    height: 69px;
  }
`;

const StatusContent = styled.div`
  background-color: #eaeef8;
  box-shadow: 0 -1px 0 0 #e9ecf4;
  text-align: center;
  padding-top: 60px;
`;

const SkittlesName = styled.div`
  ${props => props.theme.text.default};
  color: #ea3154;
  position: relative;
`;

const StatusText = styled.div`
  ${props => props.theme.text.default};
`;

type Props = {
  currentBabyId: string,
  activity: ActivityConnection,
  handleActivityMenu: Function,
  history: any,
  refetch: Function,
};

const ActivityStatus = ({
  currentBabyId,
  activity,
  handleActivityMenu,
  refetch,
  history,
  ...props
}: Props) => {
  const handleActivity = (activityAction: StimulationButtonType) => {
    let input: AdjustActivityLevelInput = {
      id: activity.id,
      babyId: currentBabyId,
    };

    if (activityAction.level) {
      input = { ...input, level: activityAction.level };
    }

    window.scrollTo(0, 0);
    return props[activityAction.callback]({
      variables: {
        input,
      },
    }).then(refreshActivity);
  };

  const refreshActivity = ({ data }) => {
    const newActivity =
      path(['swoopActivity', 'newActivity'], data) ||
      path(['changeActivity', 'newActivity'], data);

    const completedActivity = path(['completeActivity'], data);

    if (newActivity) {
      history.push(`/stimulation/${newActivity.id}`);
    }

    if (completedActivity) {
      refetch();
      history.replace(`/stimulation/${completedActivity.edge.node.id}`);
    }
  };

  return (
    <Wrapper>
      <IconWrapper>
        <GrossIcon />
      </IconWrapper>
      <StatusContent>
        <SkittlesName>Skittles</SkittlesName>
        <StatusText>Adjust the level of activity for Charlotte:</StatusText>
      </StatusContent>

      <ActivityMenu
        handleActivity={handleActivity}
        isCompleted={activity.isCompleted}
      />
    </Wrapper>
  );
};

export default compose(withState('loading', 'handleLoading', false))(
  ActivityStatus,
);
