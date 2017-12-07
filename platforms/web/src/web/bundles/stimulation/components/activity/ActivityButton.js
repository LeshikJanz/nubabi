// @flow
import React from 'react';
import iconMappings from 'web/common/iconMappings';
import * as ActivityButtonStyled from '../../styled/activity/ActivityButtonStyled';

type Props = {
  icon: string,
  mainText: string,
  additionalText: string,
  handleActivity: Function,
};

const ActivityButton = ({
  icon,
  mainText,
  additionalText,
  handleActivity,
}: Props) => (
  <ActivityButtonStyled.Wrapper onClick={handleActivity}>
    {iconMappings(icon)()}
    <ActivityButtonStyled.MainText>{mainText}</ActivityButtonStyled.MainText>
    <ActivityButtonStyled.AdditionalText>
      {additionalText}
    </ActivityButtonStyled.AdditionalText>
  </ActivityButtonStyled.Wrapper>
);

export default ActivityButton;
