import 'react-native';
import React from 'react';
import Article from '../Article';
import { expectRender } from '../../shared/testUtils';

describe('Article', () => {
  it('renders correctly', () => {
    const text = `
      # Article 
      
      This is a nicely done article with a lot of insightful content.
      
      ## And lists
      
      * Item 1
      * Item 2
      
      ## And links
      
      [Example](http://example.com)
    `;

    expectRender(
      <Article
        text={text}
      />,
    );
  });
});
