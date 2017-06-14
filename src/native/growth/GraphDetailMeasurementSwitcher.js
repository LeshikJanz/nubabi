// @flow
import type { MeasurementType } from '../../common/types';
import React from 'react';
import GraphDetailMeasurementSwitcherControl
  from './GraphDetailMeasurementSwitcherControl';

type Props = {
  currentMeasurementType: MeasurementType,
  onChange: () => void,
};

export type GraphDetailMeasurementSwitcherControlProps = {
  values: Array<MeasurementType>,
  current: MeasurementType,
  onChange: () => void,
};

const measurementTypes = ['height', 'weight'];

export const GraphDetailMeasurementSwitcher = ({
  currentMeasurementType,
  onChange,
}: Props) => {
  return (
    <GraphDetailMeasurementSwitcherControl
      onChange={onChange}
      values={measurementTypes}
      current={currentMeasurementType || 'weight'}
    />
  );
};

export default GraphDetailMeasurementSwitcher;
