// @flow
import type { Measurement } from '../../common/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Chart from 'react-native-chart';
import { memoize, evolve, curry } from 'ramda';
import moment from 'moment';
import {
  VictoryChart,
  VictoryStack,
  VictoryLabel,
  VictoryLine,
  VictoryBar,
  VictoryScatter,
  VictoryArea,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import theme from '../../common/themes/defaultTheme';
import { Box, Text } from '../components';
import { scale } from './GraphDetailChart';
import withLayout from '../components/withLayout';

type Props = {
  data: any, // TODO
};

export const CombinedChart = ({ data, layout }: Props) => {
  const width = layout.parentWidth;
  console.log('Combined Chart', data);
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
