// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import { Button } from 'web/elements/Button/index';
import { ACTIVITY_BUTTONS } from '../../constants/index';
import * as ButtonStyled from '../../styled/activity/FinishedActivityButtonStyled';

type Props = {
  handleMenu: Function,
};

const FinishedActivityButton = ({ handleMenu }: Props) => {
  const completedActivity = ACTIVITY_BUTTONS.find(a => a.type === 'done');

  return (
    <ButtonStyled.Wrapper>
      {iconMappings(completedActivity.icon)()}
      <div>
        <ButtonStyled.MainText>
          {completedActivity.mainText}
        </ButtonStyled.MainText>
        <ButtonStyled.AdditionalText>
          {completedActivity.additionalText}
        </ButtonStyled.AdditionalText>
      </div>
      <Button onClick={() => handleMenu(true)}>Change</Button>
    </ButtonStyled.Wrapper>
  );
};

export default FinishedActivityButton;
