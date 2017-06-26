import 'react-native';
import React from 'react';
import RecentMemories from '../RecentMemories';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const onItemPress = jest.fn();
  const memories = {
    edges: [
      {
        node: {
          id: '1',
          title: 'A memory',
          files: {
            edges: [
              {
                node: {
                  url: 'https://lorempixel.com/80/80/',
                },
              },
            ],
          },
        },
      },
    ],
  };

  expectRender(
    <RecentMemories memories={memories} onItemPress={onItemPress} />,
  );
});
