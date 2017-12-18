// @flow
import React from 'react';
import { ArrowLeft } from 'web/assets/images';
import * as SwitcherStyled from '../../styled/activity/ActivitySwitcherStyled';

type Props = {
  prevActivity: { id: string, name: string },
  nextActivity: { id: string, name: string },
  handleRedirect: Function,
};

const ActivitySwitcher = ({
  prevActivity,
  nextActivity,
  handleRedirect,
}: Props) => (
  <SwitcherStyled.Wrapper>
    <SwitcherStyled.PreviousElement
      onClick={() => handleRedirect(prevActivity.id)}
    >
      <ArrowLeft />
      <SwitcherStyled.Text>
        <div>Back</div>
        <div>{prevActivity.name}</div>
      </SwitcherStyled.Text>
    </SwitcherStyled.PreviousElement>
    <SwitcherStyled.Separator />
    <SwitcherStyled.NextElement onClick={() => handleRedirect(nextActivity.id)}>
      <SwitcherStyled.Text>
        <div>Next</div>
        <div>{nextActivity.name}</div>
      </SwitcherStyled.Text>
      <ArrowLeft />
    </SwitcherStyled.NextElement>
  </SwitcherStyled.Wrapper>
);

export default ActivitySwitcher;
