import 'react-native';
import React from 'react';
import Achievements from '../Achievements';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<Achievements />).toJSON();

  expect(tree).toMatchSnapshot();
});
