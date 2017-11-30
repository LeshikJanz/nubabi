import 'react-native';
import React from 'react';
import { Library } from '../Library';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');
jest.mock('../../components/NetworkIndicator');
jest.mock('../ArticleCardList');

test('it renders correctly', () => {
  expectRender(<Library />);
});
