import 'react-native';
import React from 'react';
import LeftHeader from '../LeftHeader';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<LeftHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});
