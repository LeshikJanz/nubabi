import 'react-native';
import React from 'react';
import SectionLinks from '../SectionLinks';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const edges = [
    {
      node: {
        id: 1,
        title: 'Growth Content #1',
      },
    },
    {
      node: {
        id: 2,
        title: 'Growth Content #2',
      },
    },
  ];

  expectRender(<SectionLinks links={edges} />);
});
