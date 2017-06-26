import 'react-native';
import React from 'react';
import DatePicker from '../DatePicker';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const onChange = jest.fn();
  const value = '2016-02-02';

  expectRender(
    <DatePicker onChange={onChange} date={value} format="YYYY-MM-DD" />,
  );
});
