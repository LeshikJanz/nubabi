import 'react-native';
import React from 'react';
import GrowthArticle from '../GrowthArticle';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<GrowthArticle text="Some Article text" />);
});
