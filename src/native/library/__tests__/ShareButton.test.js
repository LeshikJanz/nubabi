import 'react-native';
import React from 'react';
import ShareButton from '../ShareButton';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <ShareButton
      url="http://example.com"
      title="Some title"
      message="Some message"
    />,
  );
});
