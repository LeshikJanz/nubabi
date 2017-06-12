import 'react-native';
import React from 'react';
import { BrowseActivities } from '../BrowseActivitiesListScreen';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');

test('it renders correctly', () => {
  const activityEdges = [
    {
      node: {
        id: 1,
        name: 'Test Activity',
        skillArea: {
          id: 1,
          name: 'Test Skill Area',
          image: {
            thumb: {
              url: 'http://example.com/test.png',
            },
          },
          icon: 'icon-gross',
        },
      },
    },
  ];

  expectRender(<BrowseActivities activities={activityEdges} />);
});
