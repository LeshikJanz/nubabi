import 'react-native';
import React from 'react';
import Screen from '../Screen';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');
jest.mock('../../components/NetworkIndicator');

test('it renders a View with a panel background and an Alert component', () => {
  expectRender(<Screen />);
});
