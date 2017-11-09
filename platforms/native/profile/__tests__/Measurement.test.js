import 'react-native';
import React from 'react';
import Measurement from '../Measurement';
import renderer from 'react-test-renderer';

test('renders weight', () => {
  const tree = renderer
    .create(
      <Measurement unit="kg" amount={30} iconName="weight" header="Weight" />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('renders height', () => {
  const tree = renderer
    .create(
      <Measurement unit="cm" amount={60} iconName="height" header="Height" />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
