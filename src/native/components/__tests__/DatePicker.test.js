import 'react-native';
import React from 'react';
import DatePicker from '../DatePicker';
import { expectRender } from '../../shared/testUtils';

jest.mock('DatePickerIOS');

test('it renders correctly', () => {
  const onChange = jest.fn();
  // we use iso format instead because of CI
  const value = '2016-02-02';

  expectRender(
    <DatePicker onChange={onChange} date={value} format="YYYY-MM-DD" />,
  );
});
