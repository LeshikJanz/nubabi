import 'react-native';
import React from 'react';
import Statistics from '../Statistics';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer
    .create(<Statistics achievements={5} favourites={10} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
