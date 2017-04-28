import 'react-native';
import React from 'react';
import FavouritesButton from '../FavoritesButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<FavouritesButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
