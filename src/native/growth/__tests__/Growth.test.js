import 'react-native';
import React from 'react';
import { Growth } from '../Growth';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

jest.mock('../../components/Alert');
jest.mock('../../components/LineGraph');

test('it renders correctly', () => {
  const baby = {
    name: 'TestBaby',
    growth: {
      introduction: 'My Test Baby intro',
    },
  };

  const tree = renderer
    .create(felaTestContext(<Growth baby={baby} />))
    .toJSON();

  expect(tree).toMatchSnapshot();
});
