import 'react-native';
import React from 'react';
import PeriodFilter from '../PeriodFilter';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const periodOptions = [
    { key: 1, label: 'Week 1' },
    { key: 2, label: 'Week 2' },
  ];

  const selectedPeriod = periodOptions[0];
  const onPeriodSelect = jest.fn();

  expectRender(
    <PeriodFilter
      selectedPeriod={selectedPeriod}
      options={periodOptions}
      onPeriodSelect={onPeriodSelect}
    />,
  );
});
