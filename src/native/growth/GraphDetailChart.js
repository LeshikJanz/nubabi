// @flow
import type { Measurement } from '../../common/types';
import React from 'react';
import Chart from 'react-native-chart';
import { memoize, evolve, curry } from 'ramda';
import moment from 'moment';
import theme from '../../common/themes/defaultTheme';

type Props = {
  data: Array<Measurement>,
  width: number,
  height: number,
};

const measurementToPoint = curry(measurement => [
  new Date(measurement.recordedAt).getTime(),
  measurement.value,
]);

const transformData = memoize(data => data.map(measurementToPoint));

const formatTickX = (timestamp: number, previousTimestamp: ?number) => {
  const isSameMonth =
    previousTimestamp &&
    new Date(timestamp).getMonth() === new Date(previousTimestamp).getMonth();

  if (isSameMonth) {
    return;
  }

  return moment(timestamp).format('MMM').toUpperCase();
};

const formatTickY = (value: number, previousLabel: any) => {
  if (previousLabel && previousLabel === value.toFixed(1)) {
    return;
  }

  return value.toFixed(1);
};

export const GraphDetailChart = ({ data, width, height }: Props) => {
  console.log(transformData(data));
  return (
    <Chart
      data={[transformData(data)]}
      style={{ width, height }}
      type="line"
      color={['#ec4469']}
      fillColor={theme.colors.primary}
      showDataPoint
      dataPointColor={['#FFFFFF']}
      dataPointFillColor={[theme.colors.primary]}
      gridColor="rgba(255,255,255,0.21)"
      axisLineWidth={0}
      hideHorizontalGridLines
      xAxisTransform={formatTickX}
      yAxisTransform={formatTickY}
      axisLabelColor={theme.colors.gray}
      tightBounds
    />
  );
};

export default GraphDetailChart;
