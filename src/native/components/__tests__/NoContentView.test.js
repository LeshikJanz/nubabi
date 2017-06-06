import 'react-native';
import React from 'react';
import NoContentView from '../NoContentView';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<NoContentView />);
});

test('it renders with a custom message', () => {
  expectRender(<NoContentView message="No articles were found" />);
});
