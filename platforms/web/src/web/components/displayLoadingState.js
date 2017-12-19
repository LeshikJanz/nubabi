// @flow
import type { GraphQLDataProp, Query } from 'core/types';
import React from 'react';
import { Loader } from './index';

type Props = GraphQLDataProp<Query>;

const displayLoadingState = Component => {
  const LoadingWrapper = ({ data = {}, ...props }: Props) => {
    const isLoading = !data.viewer;

    return isLoading ? <Loader {...props} active /> : <Component {...props} />;
  };
  return LoadingWrapper;
};

export default displayLoadingState;
