import 'react-native';
import React from 'react';
import RightHeader from '../RightHeader';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<RightHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});
