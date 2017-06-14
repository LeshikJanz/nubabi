import 'react-native';
import React from 'react';
import { NextWeeksEquipmentButton } from '../NextWeeksEquipmentButton';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<NextWeeksEquipmentButton layout={layoutTestProp} />);
});
