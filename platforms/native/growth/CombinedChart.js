// @flow
import type { Measurement } from '../../../core/types';
import React from 'react';
import {
  VictoryStack,
  VictoryScatter,
  VictoryArea,
  VictoryGroup,
} from 'victory-native';
import { scale } from './GraphDetailChart';
import theme from '../../../core/themes/defaultTheme';
import withLayout from '../components/withLayout';

type Props = {
  data: any, // TODO
};

export const CombinedChart = ({ data, layout }: Props) => {
  const width = layout.parentWidth;

  return (
    <VictoryStack
      domain={{ y: 0 }}
      width={width}
      height={120}
      padding={2}
      scale={scale}
    >
      <VictoryGroup data={data.heights} x="recordedAt" y="value">
        <VictoryArea style={{ data: { fill: theme.colors.success } }} />
        <VictoryScatter
          style={{ data: { fill: theme.colors.success, stroke: '#fff' } }}
        />
      </VictoryGroup>
      <VictoryGroup data={data.weights} x="recordedAt" y="value">
        <VictoryArea style={{ data: { fill: theme.colors.primary } }} />
        <VictoryScatter
          style={{ data: { fill: theme.colors.primary, stroke: '#fff' } }}
        />
      </VictoryGroup>
    </VictoryStack>
  );
};

export default withLayout(CombinedChart);
