// @flow
import type { GraphQLDataProp, Query } from '../../common/types';
import React from 'react';
import hoistStatics from './hoistStatics';
import Loader from './RocketHorseLoader';

type Props = GraphQLDataProp<Query>;

const displayLoadingState = Component => (props: Props) => {
  const { data } = props;
  const isLoading = data && data.loading && !data.viewer;
  return isLoading ? <Loader {...props} /> : <Component {...props} />;
};

export default hoistStatics(displayLoadingState);
