import 'react-native';
import React from 'react';
import { ViewGrowthArticle } from '../ViewGrowthArticle';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

describe('ViewGrowthArticle', () => {
  it('renders correctly', () => {
    const article = {
      id: 1,
      title: 'Some Article',
      text:
        'This is a **nice** article written by someone at some point in time.',
      readingTime: 1,
    };

    expectRender(
      <ViewGrowthArticle article={article} layout={layoutTestProp} />,
    );
  });
});
