import 'react-native';
import React from 'react';
import { View } from 'react-native';
import { Memories } from '../Memories';
import { expectRender } from '../../shared/testUtils';
import { renderComponent } from 'recompose';

jest.mock('../../components/withPullToRefresh');

const data = {
  refetch: jest.fn(),
};

test('it renders correctly', () => {
  expectRender(<Memories data={data} />);
});
