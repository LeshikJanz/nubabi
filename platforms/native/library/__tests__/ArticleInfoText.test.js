import 'react-native';
import React from 'react';
import ArticleInfoText from '../ArticleInfoText';
import { expectRender } from '../../shared/testUtils';

test('it renders an author', () => {
  expectRender(<ArticleInfoText icon="md-person">Author Name</ArticleInfoText>);
});

test('it renders a date', () => {
  expectRender(
    <ArticleInfoText icon="md-calendar">Jun 10 2017</ArticleInfoText>,
  );
});
