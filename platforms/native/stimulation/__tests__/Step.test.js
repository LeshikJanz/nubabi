import 'react-native';
import React from 'react';
import { Step } from '../Step';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <Step
      activityName="Some Activity"
      step="Do something"
      currentStepIndex={1}
      length={4}
      layout={{ viewportWidth: 375 }}
    />,
  );
});
