// @flow
import type { LayoutProps } from 'core/types';
import React from 'react';
import { Box, Image, Text } from '../components';
import withLayout from '../components/withLayout';
import { ListItemNumber } from '../components/Markdown';

type StepProps = {
  step: ?string,
  index: number,
  layout: LayoutProps,
};

export const Step = (props: StepProps) => {
  const { index, layout, step } = props;
  const width = Math.round(layout.viewportWidth * 0.8);
  const height = Math.round(layout.viewportWidth * 0.35);

  if (!step) {
    return (
      <Box>
        <Image
          src={require('core/images/centered-paragraph.png')}
          size={{ width, height }}
          opacity={0.2}
        />
      </Box>
    );
  }

  return (
    <Box contentSpacing>
      <Box flexDirection="row" alignItems="flex-start" justifyContent="center">
        <Box>
          <ListItemNumber
            number={index + 1}
            style={{ marginLeft: 0, marginRight: 0 }}
          />
        </Box>
        <Box flex={1} marginLeft={0.5}>
          <Text size={4} lineHeight={26} style={() => ({ color: '#6A7683' })}>
            {step}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default withLayout(Step);
