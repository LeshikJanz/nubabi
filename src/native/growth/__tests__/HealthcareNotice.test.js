import 'react-native';
import React from 'react';
import { HealthcareNotice } from '../HealthcareNotice';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const tree = renderer.create(felaTestContext(<HealthcareNotice />)).toJSON();

  expect(tree).toMatchSnapshot();
});
