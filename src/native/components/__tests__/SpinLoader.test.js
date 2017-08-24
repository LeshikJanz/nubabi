import 'react-native';
import React from 'react';
import Loader from '../SpinLoader';
import { expectRender } from '../../shared/testUtils';

jest.mock('Alert');

test('it renders correctly', () => {
  expectRender(<Loader />);
});

test('it can customize the size and color', () => {
  expectRender(<Loader size={20} color="blue" />);
});
