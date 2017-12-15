import 'react-native';
import React from 'react';
import GrowthChartButton from '../GrowthChartButton';
import { expectRender } from '../../shared/testUtils';

describe('GrowthChartButton', () => {
  it('renders correctly', () => {
    const unitDisplay = {
      weight: 'kg',
      height: 'cm',
    };

    expectRender(
      <GrowthChartButton
        babyName="Alice"
        unitDisplay={unitDisplay}
      />,
    );
  });
});
