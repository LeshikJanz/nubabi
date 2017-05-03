import 'react-native';
import React from 'react';
import Growth from '../GrowthScreen';
import renderer from 'react-test-renderer';

jest.mock('../../components/Alert');

test('it renders correctly', () => {
  const tree = renderer.create(<Growth />).toJSON();

  expect(tree).toMatchSnapshot();
});
