import 'react-native';
import React from 'react';
import ArticleListItem from '../ArticleListItem';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <ArticleListItem
      title="Some Article"
      image={{ url: 'http://example.com/example.png' }}
    />,
  );
});

test('it can render without an image', () => {
  expectRender(<ArticleListItem title="Some Article without image" />);
});
