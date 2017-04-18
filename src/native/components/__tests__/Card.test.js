import 'react-native';
import React from 'react';
import Card from '../Card';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<Card />).toJSON();

  expect(tree).toMatchSnapshot();
});
