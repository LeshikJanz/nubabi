// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import { Button } from 'web/elements/Button/index';
import { ACTIVITY_BUTTONS } from '../../constants/index';
import * as ButtonStyled from '../../styled/activity/FinishedActivityButtonStyled';

type Props = {
  handleActivityMenu: Function,
};

const FinishedActivityButton = (props: Props) => {
  console.log('props');
  console.log(props);
  const completedActivity = ACTIVITY_BUTTONS.find(a => a.type === 'done');

  return (
    <ButtonStyled.Wrapper>
      <ButtonStyled.Button>
        {iconMappings(completedActivity.icon)()}
        <div>
          <ButtonStyled.MainText>
            {completedActivity.mainText}
          </ButtonStyled.MainText>
          <ButtonStyled.AdditionalText>
            {completedActivity.additionalText}
          </ButtonStyled.AdditionalText>
        </div>
        <Button onClick={() => props.handleActivityMenu(true)}>Change</Button>
      </ButtonStyled.Button>
    </ButtonStyled.Wrapper>
  );
};

export default FinishedActivityButton;
