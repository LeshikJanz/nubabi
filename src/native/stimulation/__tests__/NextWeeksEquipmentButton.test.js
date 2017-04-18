import 'react-native';
import React from 'react';
import NextWeeksEquipmentButton from '../NextWeeksEquipmentButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<NextWeeksEquipmentButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
