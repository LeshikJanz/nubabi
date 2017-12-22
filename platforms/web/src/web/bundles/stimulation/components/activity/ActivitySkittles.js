/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
import * as SkittlesStyled from '../../styled/activity/ActivitySkittlesStyled';

type Props = {
  steps: string[],
};

const ActivitySkittles = ({ steps }: Props) => (
  <SkittlesStyled.Wrapper>
    <SkittlesStyled.ActivityHeadingText>
      Let's begin Skittles
    </SkittlesStyled.ActivityHeadingText>
    {steps.map((step, i) => (
      <SkittlesStyled.Container key={i}>
        <SkittlesStyled.StepNumber>{i + 1}</SkittlesStyled.StepNumber>
        <SkittlesStyled.StepText>{step}</SkittlesStyled.StepText>
      </SkittlesStyled.Container>
    ))}
  </SkittlesStyled.Wrapper>
);

export default ActivitySkittles;
