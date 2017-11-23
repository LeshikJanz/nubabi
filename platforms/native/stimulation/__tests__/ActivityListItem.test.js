import 'react-native';
import React from 'react';
import ActivityListItem from '../ActivityListItem';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const activity = {
    id: 1,
    name: 'Sensory Activity 1',
  };

  const skillArea = {
    id: 1,
    name: 'Sensory',
    image: {
      thumb: {
        url: 'http://example.com/example.png',
      },
    },
    icon: 'icon-sensory',
  };

  expectRender(<ActivityListItem activity={activity} skillArea={skillArea} />);
});
