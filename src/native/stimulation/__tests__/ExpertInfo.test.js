import 'react-native';
import React from 'react';
import { ExpertInfo } from '../ExpertInfo';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  const expert = {
    id: 1,
    name: 'Some Expert',
    discipline: 'Some Discipline',
    avatar: {
      url: 'http://example.com/example.png',
    },
    biography: 'some biography',
  };

  expectRender(
    <ExpertInfo
      expert={expert}
      activityDescription="Some activity description"
      layout={{ viewportWidth: 375 }}
    />,
  );
});
