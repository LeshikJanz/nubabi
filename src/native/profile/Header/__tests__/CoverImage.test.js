import 'react-native';
import React from 'react';
import CoverImage from '../CoverImage';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<CoverImage />).toJSON();

  expect(tree).toMatchSnapshot();
});
