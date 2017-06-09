// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { getContext } from 'recompose';
import theme from '../../common/themes/defaultTheme';
import { LineGraph } from '../components/LineGraph';
import PropTypes from 'prop-types';
import withLayout from '../components/withLayout';

type Measurement = {
  timestamp: number,
  value: number,
};

type Props = {
  data: Array<Measurement>,
  layout: LayoutProps,
};

const measurementX = x => x.timestamp;
const measurementY = y => y.value;

export const Chart = ({ data, layout }: Props) => {
  const { parentWidth, viewportHeight } = layout;
  const graphHeight = viewportHeight * 0.2;

  console.log(data);

  return (
    <LineGraph
      data={data}
      xAccessor={measurementX}
      yAccessor={measurementY}
      strokeColor="#EC4469"
      fillColor={theme.colors.primary}
      width={parentWidth}
      height={graphHeight}
    />
  );
};

export default withLayout(Chart);
