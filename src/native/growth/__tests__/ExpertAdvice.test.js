import 'react-native';
import React from 'react';
import { ExpertAdvice } from '../ExpertAdvice';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <ExpertAdvice
      name="Test Expert"
      discipline="Test Doctor"
      avatar={{ url: 'http://example.com/person.png' }}
    />,
  );
});
