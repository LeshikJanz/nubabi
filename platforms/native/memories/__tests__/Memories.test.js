import 'react-native';
import React from 'react';
import { Memories } from '../Memories';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/withPullToRefresh');

const data = {
  refetch: jest.fn(),
};

test('it renders correctly', () => {
  expectRender(<Memories data={data} />);
});
