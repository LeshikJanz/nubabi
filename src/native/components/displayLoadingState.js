// @flow
import type { GraphQLDataProp } from '../../common/types';
import React from 'react';
import hoistStatics from './hoistStatics';
import Loader from './Loader';

type Props = {
  data: GraphQLDataProp<*>,
};

const displayLoadingState = Component =>
  (props: Props) =>
    props.data.loading ? <Loader {...props} /> : <Component {...props} />;

export default hoistStatics(displayLoadingState);
