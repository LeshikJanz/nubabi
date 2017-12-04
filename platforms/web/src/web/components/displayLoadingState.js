// @flow
import React from 'react';
import type { GraphQLDataProp, Query } from 'core/types';
import { Loader } from './index';

type Props = GraphQLDataProp<Query>;

const DisplayLoadingState = Component => {
  const LoadingWrapper = ({ data = {}, ...props }: Props) => {
    const isLoading = data.loading && !data.viewer;

    return isLoading ? <Loader {...props} active /> : <Component {...props} />;
  };
  return LoadingWrapper;
};

export default DisplayLoadingState;
