// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import GrossIcon from 'web/assets/images/icons/gross-icon.svg';
import { ACTIVITY_BUTTONS } from '../constants/index';
import ActivityButton from './ActivityButton';
import FinishedActivityButton from './FinishedActivityButton';

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

const ActivityButtons = styled(Flex)`
  justify-content: center;
  margin-top: 24px;

  > div {
    margin: 0 8px;
  }
`;

type Props = {
  id: string,
  currentBabyId: string,
  isCompleted: boolean,
};

const refreshActivity = () => {
  // console.log('data');
  // console.log(data);
  // const newActivity =
  //   path(['swoopActivity', 'newActivity'], data) ||
  //   path(['changeActivity', 'newActivity'], data);
  //
  // if (newActivity) {
  //   this.props.navigation.setParams({
  //     id: newActivity.id,
  //     title: newActivity.name,
  //   });
  // }
};

const ActivityStatus = ({
  id,
  currentBabyId,
  isCompleted,
  ...props
}: Props) => {
  const handleActivity = activityAction => {
    props[activityAction.callback]({
      variables: {
        input: {
          id,
          babyId: currentBabyId,
        },
      },
    }).then(refreshActivity);
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

      <ActivityButtons>
        {(isCompleted && (
          <FinishedActivityButton
            {...ACTIVITY_BUTTONS.find(a => a.type === 'done')}
          />
        )) ||
          ACTIVITY_BUTTONS.map((a, i) => (
            <ActivityButton
              key={i}
              handleActivity={() => handleActivity(a)}
              {...a}
            />
          ))}
      </ActivityButtons>
    </Wrapper>
  );
};

export default ActivityStatus;
