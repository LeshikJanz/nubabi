import 'react-native';
import React from 'react';
import Markdown from '../Markdown';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const text = `
    # This is my title
    
    We're doing some Markdown magic here aren't we.
    
    * Cool
    * Cooler
    * Even cooler
    
    1. Not cool
    2. Not cooler
    3. Even less cooler
    
    [Nubabi](https://example.com) rocks!
  `;

  expectRender(<Markdown text={text} />);
});
