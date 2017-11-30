// @flow
import type { Measurement } from 'core/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { memoize, curry } from 'ramda';
import moment from 'moment';
import {
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  VictoryArea,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import theme from 'core/themes/defaultTheme';

type Props = {
  data: Array<Measurement>,
};

export const measurementToPoint = curry(measurement => ({
  x: new Date(measurement.recordedAt),
  y: measurement.value,
}));

export const transformData = memoize(data => data.map(measurementToPoint));

const scale = { x: 'time', y: 'linear' };

const fontStyle = {
  fontFamily: 'System',
  stroke: theme.colors.gray,
};

const style = {
  data: { fill: theme.colors.primary },
  labels: {
    ...fontStyle,
  },
};
const pointStyle = {
  data: { fill: '#ec4469', stroke: '#fff' },
};

const barStyle = {
  data: {
    fill: 'transparent',
    stroke: '#fff',
    width: StyleSheet.hairlineWidth,
    opacity: 0.1,
  },
};

const axisStyle = {
  labels: {
    ...fontStyle,
  },
};

const tickFormat = date => {
  return moment(date).format('MMM');
};

export const GraphDetailChart = ({ data }: Props) => {
  const chartData = transformData(data);

  return (
    <VictoryChart scale={scale}>
      <VictoryGroup data={chartData}>
        <VictoryArea style={style} interpolation="catmullRom" />
        <VictoryBar style={barStyle} />
        <VictoryScatter style={pointStyle} />

        <VictoryAxis dependentAxis style={axisStyle} />
        <VictoryAxis
          dependentAxis={false}
          style={axisStyle}
          tickFormat={tickFormat}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default GraphDetailChart;
