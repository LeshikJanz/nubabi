import 'react-native';
import React from 'react';
import NameAgeRow from '../NameAgeRow';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer
    .create(
      <NameAgeRow
        babyName="Ruby"
        birthDate={'2017-04-02'}
        onEditBaby={() => {}}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
