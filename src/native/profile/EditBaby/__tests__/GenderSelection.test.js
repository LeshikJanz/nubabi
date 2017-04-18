import 'react-native';
import React from 'react';
import GenderSelection from '../GenderSelection';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<GenderSelection />).toJSON();

  expect(tree).toMatchSnapshot();
});
