// @flow
import React, { PureComponent } from 'react';
import type { GraphQLDataProp, Query } from 'core/types';
import { Loader } from './index';

type Props = GraphQLDataProp<Query>;

const DisplayLoadingState = Component =>
  class LoadingWrapper extends React.Component<Props> {
    render() {
      const { data = {} } = this.props;
      const isLoading = !data.viewer;

      return isLoading ? (
        <Loader {...this.props} active />
      ) : (
        <Component {...this.props} />
      );
    }
  };

export default DisplayLoadingState;
