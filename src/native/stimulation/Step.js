// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { Box, Text, Image } from '../components';
import withLayout from '../components/withLayout';

type StepTitleProps = {
  index: number,
  length: number,
  activityName: string,
};

type StepProps = {
  activityName: string,
  step: string,
  currentStepIndex: number,
  length: number,
  layout: LayoutProps,
};

const StepTitle = (props: StepTitleProps) => {
  const { activityName, index, length } = props;
  let actionCall;

  if (index === 0) {
    actionCall = 'begin';
  } else if (index === length - 1) {
    actionCall = 'finish';
  } else {
    actionCall = 'continue';
  }

  const title = `Let's ${actionCall} ${activityName}`;

  return (
    <Box marginBottom={1}>
      <Text color="black" spacing={-0.43} size={3}>{title}</Text>
    </Box>
  );
};

export const Step = (props: StepProps) => {
  const { currentStepIndex, activityName, layout, length, step } = props;

  if (!step) {
    return null;
  }

  const width = Math.round(layout.viewportWidth * 0.80);
  const height = Math.round(layout.viewportWidth * 0.35);

  return (
    <Box>
      <StepTitle
        activityName={activityName}
        index={currentStepIndex}
        step={step}
        length={length}
      />
      <Text marginBottom={1}>{step}</Text>
      <Image
        src={require('../../common/images/centered-paragraph.png')}
        size={{ width, height }}
        opacity={0.2}
      />
    </Box>
  );
};

export default withLayout(Step);
