import 'react-native';
import React from 'react';
import PillSwitcher from '../PillSwitcher';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const onSelect = jest.fn();
  expectRender(
    <PillSwitcher
      currentValue="Months"
      availableValues={['Months', 'Weeks']}
      onSelect={onSelect}
    />,
  );

  expectRender(
    <PillSwitcher
      currentValue="cm"
      availableValues={['cm', 'in']}
      onSelect={onSelect}
    />,
  );
});
