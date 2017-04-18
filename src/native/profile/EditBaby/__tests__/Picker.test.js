import 'react-native';
import React from 'react';
import Picker from '../Picker';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const mockField = {
    input: {
      value: 30,
    },
    meta: {
      error: false,
    },
  };
  const tree = renderer.create(<Picker field={mockField} />).toJSON();

  expect(tree).toMatchSnapshot();
});
