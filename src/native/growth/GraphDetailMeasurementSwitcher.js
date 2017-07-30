// @flow
import type { MeasurementType } from '../../common/types';
import React from 'react';
// platform extensions
/* eslint-disable import/no-unresolved */
// $FlowFixMe$
import GraphDetailMeasurementSwitcherControl from './GraphDetailMeasurementSwitcherControl';
/* eslint-enable import/no-unresolved */

type Props = {
  currentMeasurementType?: MeasurementType,
  onChange: (value: string) => void,
};

export type GraphDetailMeasurementSwitcherControlProps = {
  values: Array<MeasurementType>,
  current: MeasurementType,
  onChange: (value: string) => void,
};

const measurementTypes = ['height', 'weight'];

export const GraphDetailMeasurementSwitcher = ({
  currentMeasurementType = 'weight',
  onChange,
}: Props) => {
  return (
    <GraphDetailMeasurementSwitcherControl
      onChange={onChange}
      values={measurementTypes}
      current={currentMeasurementType}
    />
  );
};

export default GraphDetailMeasurementSwitcher;
