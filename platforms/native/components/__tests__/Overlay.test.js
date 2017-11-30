import { Text } from 'react-native';
import React from 'react';
import Overlay from '../Overlay';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <Overlay>
      <Text>Some text</Text>
    </Overlay>,
  );
});

test('it renders correctly without children', () => {
  expectRender(<Overlay />);
});
