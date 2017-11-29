// @flow
import React from 'react';
import { Baby } from 'core/types';

type Props = {
  baby: Baby,
};

const Activity = ({ baby: { activity = {} } }: Props) => {
  console.log('activity');
  console.log(activity);

  return <h1>Activity</h1>;
};

export default Activity;
