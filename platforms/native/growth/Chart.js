// @flow
import type { LayoutProps, Measurement } from 'core/types';
import React from 'react';
import theme from 'core/themes/defaultTheme';
import { LineGraph } from '../components/LineGraph';
import withLayout from '../components/withLayout';

type Props = {
  data: Array<Measurement>,
  layout: LayoutProps,
  width?: number,
  height?: number,
  withLegend?: boolean,
  measurementX?: Measurement => number,
  measurementY?: Measurement => number,
  formatTickX?: Date => string,
  formatTickY?: number => string,
};

const defaultMeasurementX = x => new Date(x.recordedAt).getTime();
const defaultMeasurementY = y => parseFloat(y.value.toFixed(2));

export const Chart = ({
  data,
  layout,
  width,
  height,
  withLegend = false,
  measurementX = defaultMeasurementX,
  measurementY = defaultMeasurementY,
  formatTickX,
  formatTickY,
}: Props) => {
  const { parentWidth, viewportHeight } = layout;
  const graphHeight = viewportHeight * 0.2;

  return (
    <LineGraph
      data={data}
      xAccessor={measurementX}
      yAccessor={measurementY}
      strokeColor="#EC4469"
      fillColor={theme.colors.primary}
      width={width || parentWidth}
      height={height || graphHeight}
      withLegend={withLegend}
      formatTickX={formatTickX}
      formatTickY={formatTickY}
    />
  );
};

export default withLayout(Chart);
