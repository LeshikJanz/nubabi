import 'react-native';
import React from 'react';
import { HorizontalCardItem } from '../HorizontalCardItem';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

test('it renders correctly', () => {
  const files = [
    {
      url: 'https://lorempixel.com/80/80/',
    },
  ];

  expectRender(
    <HorizontalCardItem files={files} title="Item" layout={layoutTestProp} />,
  );
});
