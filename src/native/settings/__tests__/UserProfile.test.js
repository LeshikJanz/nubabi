import 'react-native';
import React from 'react';
import { UserProfile } from '../UserProfile';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const viewer = {
    babies: {
      count: 3,
    },
    totalMemories: 2,
    totalAchievements: 1,
  };
  const user = {
    id: 'some',
    firstName: 'Mommy',
    lastName: 'Foo',
  };

  expectRender(<UserProfile user={user} viewer={viewer} />);
});
