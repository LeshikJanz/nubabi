import 'react-native';
import React from 'react';
import DidYouKnow from '../DidYouKnow';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<DidYouKnow />).toJSON();

  expect(tree).toMatchSnapshot();
});
