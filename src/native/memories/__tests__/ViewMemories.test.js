import 'react-native';
import React from 'react';
import { ViewMemories } from '../ViewMemories';
import { expectRender } from '../../shared/testUtils';

const memories = require('./ViewMemories.fixture.json');

test('it renders correctly', () => {
  expectRender(<ViewMemories babyId="some" memories={memories} />);
});
