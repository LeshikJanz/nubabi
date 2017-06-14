import 'react-native';
import React from 'react';
import AgeHeader from '../AgeHeader';
import { expectRender } from '../../shared/testUtils';

const today = '2017-04-26';

test('it renders correctly', () => {
  Date.now = jest.fn(() => new Date(today));

  const dob = '2017-04-16';

  expectRender(<AgeHeader name="Ruby" dob={dob} />);

  expectRender(<AgeHeader name="Ruby" dob="2017-02-16" />);
});
