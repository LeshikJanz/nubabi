// @flow
import type { Baby, ActivityConnection } from 'core/types';
import React from 'react';
import { ArrowLeft } from 'web/assets/images';
import { withRouter } from 'react-router-dom';
import * as SwitcherStyled from '../../styled/activity/ActivitySwitcherStyled';

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
    if (id) {
      history.push(`/activity/${id}`);
    } else {
      // Redirect to the full Activity list for edge elements
      history.push('/stimulation/weeks');
    }
    window.scrollTo(0, 0);
  };

  return (
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
      <SwitcherStyled.NextElement
        onClick={() => handleRedirect(nextActivity.id)}
      >
        <SwitcherStyled.Text>
          <div>Next</div>
          <div>{nextActivity.name}</div>
        </SwitcherStyled.Text>
        <ArrowLeft />
      </SwitcherStyled.NextElement>
    </SwitcherStyled.Wrapper>
  );
};

export default withRouter(ActivitySwitcher);
