import 'react-native';
import React from 'react';
import Link from '../Link';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<Link title="Some title" url="http://example.com" />);
});
