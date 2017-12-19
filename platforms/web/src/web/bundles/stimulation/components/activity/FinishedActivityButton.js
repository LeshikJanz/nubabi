// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import { Button } from 'web/elements/Button/index';
import * as ButtonStyled from '../../styled/activity/FinishedActivityButtonStyled';
import { StimulationButtonType } from 'web/types/custom';

type Props = {
  handleActivityMenu: Function,
  completedActivity: StimulationButtonType,
};

const FinishedActivityButton = ({
  completedActivity,
  handleActivityMenu,
}: Props) => (
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
      <Button onClick={() => handleActivityMenu(true)}>Change</Button>
    </ButtonStyled.Button>
  </ButtonStyled.Wrapper>
);

export default FinishedActivityButton;
