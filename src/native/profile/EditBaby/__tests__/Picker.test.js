import 'react-native';
import React from 'react';
import Picker, { weekOptions } from '../Picker';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly', () => {
  const mockField = {
    input: {
      value: 30,
    },
    meta: {
      error: false,
    },
  };

  expectRender(<Picker field={mockField} />);
});

test('week options should start at 20 and finish at 43', () => {
  expect(weekOptions[0].props.value).toEqual(20);

  expect(weekOptions[weekOptions.length - 1].props.value).toEqual(43);
});
