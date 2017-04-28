import 'react-native';
import React from 'react';
import Card from '../Card';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const tree = renderer.create(felaTestContext(<Card />)).toJSON();

  expect(tree).toMatchSnapshot();
});
