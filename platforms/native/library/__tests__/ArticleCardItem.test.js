import 'react-native';
import React from 'react';
import ArticleCardItem from '../ArticleCardItem';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <ArticleCardItem
      title="Some Article"
      image={{ url: 'http://example.com' }}
    />,
  );
});
