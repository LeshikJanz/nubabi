// @flow
import type { GraphQLDataProp } from '../../common/types';
import React from 'react';
import hoistStatics from './hoistStatics';
import Loader from './Loader';

type Props = {
  data: GraphQLDataProp<*>,
};

const displayLoadingState = Component =>
  (props: Props) => {
    const isLoading = props.data.loading && !props.data.viewer;
    return isLoading ? <Loader {...props} /> : <Component {...props} />;
  };

export default hoistStatics(displayLoadingState);
