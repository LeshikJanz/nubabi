import 'react-native';
import React from 'react';
import { ExpertAdvice } from '../ExpertAdvice';
import renderer from 'react-test-renderer';
import felaTestContext from '../../shared/felaTestContext';

test('it renders correctly', () => {
  const component = (
    <ExpertAdvice
      name="Test Expert"
      discipline="Test Doctor"
      avatar={{ url: 'http://example.com/person.png' }}
    />
  );

  const tree = renderer.create(felaTestContext(component)).toJSON();

  expect(tree).toMatchSnapshot();
});
