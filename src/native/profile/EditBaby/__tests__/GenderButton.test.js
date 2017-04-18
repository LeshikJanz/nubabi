import 'react-native';
import React from 'react';
import GenderButton from '../GenderButton';
import renderer from 'react-test-renderer';

test('it renders correctly when selected', () => {
  const tree = renderer
    .create(<GenderButton selected buttonText="GIRL" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('it renders correctly when not selected', () => {
  const tree = renderer
    .create(<GenderButton selected={false} buttonText="BOY" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
