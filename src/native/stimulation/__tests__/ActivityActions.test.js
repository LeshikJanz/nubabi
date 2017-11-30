import 'react-native';
import React from 'react';
import ActivityActions from '../ActivityActions';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

const handleSwoop = jest.fn();
const onIncrease = jest.fn();
const onDecrease = jest.fn();

test('it renders collapsed', () => {
  const tree = renderer
    .create(
      felaTestContext(
        <ActivityActions
          babyName="Ruby"
          activityName="Gross Motor 1"
          skillIcon={1}
          onSwoop={handleSwoop}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />,
      ),
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('it renders expanded for the level action adjust cards', () => {
  const tree = renderer
    .create(
      felaTestContext(
        <ActivityActions
          babyName="Ruby"
          activityName="Gross Motor 2"
          skillIcon={1}
          onSwoop={handleSwoop}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          collapsed={false}
        />,
      ),
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
