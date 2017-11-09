import 'react-native';
import React from 'react';
import Header from '../FavoritesButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const component = (
    <Header
      activityName="Test Activity"
      skillName="Test Skill"
      skillImage={{ url: 'http://test.example.com' }}
      onPress={jest.fn}
    />
  );

  const tree = renderer.create(component).toJSON();

  expect(tree).toMatchSnapshot();
});
