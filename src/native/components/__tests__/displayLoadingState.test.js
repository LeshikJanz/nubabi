import { Text } from 'react-native';
import React from 'react';
import displayLoadingState from '../displayLoadingState';
import { expectRender } from '../../shared/testUtils';

// TODO: better mocking, this shoulds null on the snapshot
jest.mock('../RocketHorseLoader');

const Inner = () => <Text>The component</Text>;
const Component = displayLoadingState(Inner);

test('it displays a loader when loading', () => {
  expectRender(<Component data={{ loading: true }} />);
});

test('it renders the component when loading is finished', () => {
  expectRender(<Component data={{ loading: false }} />);
});

test('it renders the component when data is loading but exists in cache', () => {
  expectRender(<Component data={{ loading: true, viewer: {} }} />);
});
