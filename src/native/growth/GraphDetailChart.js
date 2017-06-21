// @flow
import type { Measurement } from '../../common/types';
import React from 'react';
import Chart from 'react-native-chart';
import { memoize, evolve, curry } from 'ramda';
import moment from 'moment';
import {
  VictoryChart,
  VictoryStack,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import theme from '../../common/themes/defaultTheme';
import { Box, Text } from '../components';

type Props = {
  data: Array<Measurement>,
  width: number,
  height: number,
};

const measurementToPoint = curry(measurement => ({
  x: new Date(measurement.recordedAt),
  y: measurement.value,
}));

const transformData = memoize(data => data.map(measurementToPoint));

const formatTickX = (date: Date) => {
  return moment(date).format('MMM').toUpperCase();
};

const formatTickY = (value: number, previousLabel: any) => {
  if (previousLabel && previousLabel === value.toFixed(1)) {
    return;
  }

  return value.toFixed(1);
};

const YAxisLabel = ({ angle, text }) => {
  return (
    <Box
      style={() => ({
        marginLeft: 25,
        transform: [
          {
            rotateZ: `${angle}deg`,
          },
        ],
      })}
    >
      <Text bold>{text}</Text>
    </Box>
  );
};

export const GraphDetailChart = ({
  data,
  width,
  height,
  currentUnit,
}: Props) => {
  console.log(transformData(data));
  const chartData = transformData(data);
  const scale = { x: 'time', y: 'linear' };
  const style = {
    data: { fill: theme.colors.primary },
    labels: {
      fontFamily: 'System',
    },
  };
  const pointStyle = {
    data: { fill: '#ec4469', stroke: '#fff' },
  };

  const yAxisStyle = {};

  return (
    <VictoryChart scale={scale}>
      <VictoryGroup data={chartData}>
        <VictoryArea style={style} />
        <VictoryScatter style={pointStyle} />
        <VictoryAxis
          dependentAxis
          label={currentUnit}
          style={yAxisStyle}
          axisLabelComponent={<VictoryLabel transform="rotate(-45, 0,0)" />}
        />
        <VictoryAxis
          dependentAxis={false}
          tickFormat={formatTickX}
          label="Months"
          tickCount={4}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default GraphDetailChart;
