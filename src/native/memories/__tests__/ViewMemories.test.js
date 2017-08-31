import 'react-native';
import React from 'react';
import { ViewMemories } from '../ViewMemories';
import { expectRender } from '../../shared/testUtils';

const memories = require('./ViewMemories.fixture.json');

// TODO: Skipping this for the time being, `connect` in the tree
// we should be testing ActivityList anyways.
test.skip('it renders correctly', () => {
  expectRender(<ViewMemories babyId="some" memories={memories} />);
});
