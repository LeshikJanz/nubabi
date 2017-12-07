// @flow
import React from 'react';
import type { GraphQLDataProp, Query } from 'core/types';
import { Loader } from './index';

type Props = GraphQLDataProp<Query>;

const GlobalSpinner = Component => {
  const LoadingWrapper = ({ loading, ...props }: Props) => {
    return loading ? <Loader {...props} active /> : <Component {...props} />;
  };
  return LoadingWrapper;
};

export default GlobalSpinner;
