import 'react-native';
import React from 'react';
import { GraphDetailHeader } from '../GraphDetailHeader';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

test('it renders correctly', () => {
  const onSwitch = jest.fn();

  expectRender(
    <GraphDetailHeader
      name="Baby"
      layout={layoutTestProp}
      onSwitchMeasurementType={onSwitch}
    />,
  );
});
