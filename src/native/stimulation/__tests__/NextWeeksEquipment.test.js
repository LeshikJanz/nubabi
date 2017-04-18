import 'react-native';
import React from 'react';
import NextWeeksEquipment from '../NextWeeksEquipment';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<NextWeeksEquipment />).toJSON();

  expect(tree).toMatchSnapshot();
});
