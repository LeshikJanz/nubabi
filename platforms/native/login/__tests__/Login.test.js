import 'react-native';
import React from 'react';
import { Login } from '../Login';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');
jest.mock('../FacebookLogin');

test('renders correctly', () => {
  expectRender(<Login isFetching={false} actions={{}} />);
});

test('show progress when logging in', () => {
  expectRender(<Login isFetching actions={{}} />);
});
