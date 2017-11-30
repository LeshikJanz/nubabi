import 'react-native';
import React from 'react';
import { ArticleTags } from '../ArticleTags';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const tags = [{ id: 1, name: 'Sensory' }, { id: 2, name: 'Another One' }];

  expectRender(<ArticleTags tags={tags} layout={{ viewportWidth: 375 }} />);
});
