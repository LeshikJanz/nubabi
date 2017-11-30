import 'react-native';
import React from 'react';
import DidYouKnow from '../DidYouKnow';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const tree = renderer.create(felaTestContext(<DidYouKnow />)).toJSON();

  expect(tree).toMatchSnapshot();
});
