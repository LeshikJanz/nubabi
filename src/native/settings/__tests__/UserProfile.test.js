import 'react-native';
import React from 'react';
import { UserProfileTrigger } from '../UserProfileTrigger';
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

  expectRender(<UserProfileTrigger user={user} viewer={viewer} />);
});
