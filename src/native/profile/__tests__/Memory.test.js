import 'react-native';
import React from 'react';
import Memory from '../Memory';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const memory = {
    image: { uri: 'http://example.com/example.jpeg' },
    caption: 'Some caption',
  };

  const tree = renderer.create(<Memory memory={memory} />).toJSON();

  expect(tree).toMatchSnapshot();
});
