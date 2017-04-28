import 'react-native';
import React from 'react';
import ActionCard from '../ActionCard';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const tree = renderer
    .create(
      felaTestContext(
        <ActionCard
          icon="md-arrow-down"
          text="NOT READY"
          hint="Not quite ready for this"
          onPress={() => {}}
        />,
      ),
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
