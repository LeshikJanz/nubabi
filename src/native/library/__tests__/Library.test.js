import 'react-native';
import React from 'react';
import Library from '../Library';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<Library />).toJSON();

  expect(tree).toMatchSnapshot();
});
