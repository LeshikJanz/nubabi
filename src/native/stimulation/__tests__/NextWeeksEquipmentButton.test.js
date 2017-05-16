import 'react-native';
import React from 'react';
import { NextWeeksEquipmentButton } from '../NextWeeksEquipmentButton';
import renderer from 'react-test-renderer';
import layoutTestProp from '../../shared/layoutTestProp';

test('it renders correctly', () => {
  const tree = renderer
    .create(<NextWeeksEquipmentButton layout={layoutTestProp} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
