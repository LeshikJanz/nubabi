import 'react-native';
import React from 'react';
import ActionIcon from '../ActionIcon';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const tree = renderer
    .create(felaTestContext(<ActionIcon name="md-arrow-down" />))
    .toJSON();

  expect(tree).toMatchSnapshot();
});
