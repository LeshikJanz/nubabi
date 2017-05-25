import 'react-native';
import React from 'react';
import { BrowseActivities } from '../BrowseActivities';
import renderer from 'react-test-renderer';

jest.mock('../../components/Alert');

test.only('it renders correctly', () => {
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

  const tree = renderer
    .create(<BrowseActivities activities={activityEdges} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
